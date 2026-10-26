import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { rateLimit } from 'express-rate-limit';
import { Progress, User } from './models.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const app = express();
const port = Number(process.env.PORT) || 4000;
const sessionCookie = 'codequest_session';
const sessionDuration = '7d';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is required to start the API server.');
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set to a random value of at least 32 characters.');
}

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

function publicUser(user) {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function setSessionCookie(res, userId) {
  const token = jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: sessionDuration,
  });
  res.cookie(sessionCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function requireAuth(req, res, next) {
  const token = req.cookies[sessionCookie];
  if (!token) {
    return res.status(401).json({ message: 'Please sign in to continue.' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    return next();
  } catch {
    res.clearCookie(sessionCookie, { httpOnly: true, sameSite: 'lax' });
    return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
  }
}

function normalizeProgress(progress) {
  return {
    solved: progress?.solved ?? [],
    submissions: (progress?.submissions ?? []).map((submission) => ({
      id: `${submission.problemId}-${new Date(submission.submittedAt).getTime()}`,
      problemId: submission.problemId,
      problemTitle: submission.problemTitle,
      language: submission.language,
      code: submission.code,
      status: submission.status,
      submittedAt: submission.submittedAt,
      result: submission.status,
    })),
    streak: progress?.streak ?? 0,
  };
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/signup', authLimiter, async (req, res, next) => {
  try {
    const fullName = typeof req.body.fullName === 'string' ? req.body.fullName.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (!fullName || fullName.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        password.length < 6 || password.length > 128) {
      return res.status(400).json({ message: 'Enter a valid name, email, and password of at least 6 characters.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, email, passwordHash });
    setSessionCookie(res, user._id);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'An account with this email address already exists.' });
    }
    return next(error);
  }
});

app.post('/api/auth/login', authLimiter, async (req, res, next) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    setSessionCookie(res, user._id);
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie(sessionCookie, { httpOnly: true, sameSite: 'lax' });
  return res.json({ message: 'Signed out.' });
});

app.get('/api/auth/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.clearCookie(sessionCookie, { httpOnly: true, sameSite: 'lax' });
      return res.status(401).json({ message: 'Account not found. Please sign in again.' });
    }
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.patch('/api/auth/profile', requireAuth, async (req, res, next) => {
  try {
    const fullName = typeof req.body.fullName === 'string' ? req.body.fullName.trim() : '';
    if (!fullName || fullName.length > 80) {
      return res.status(400).json({ message: 'Display name must be between 1 and 80 characters.' });
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { fullName } },
      { new: true, runValidators: true }
    );
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.patch('/api/auth/password', requireAuth, async (req, res, next) => {
  try {
    const currentPassword = typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';
    if (newPassword.length < 6 || newPassword.length > 128) {
      return res.status(400).json({ message: 'New password must be between 6 and 128 characters.' });
    }
    const user = await User.findById(req.userId).select('+passwordHash');
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    return res.json({ message: 'Password updated.' });
  } catch (error) {
    return next(error);
  }
});

app.get('/api/progress', requireAuth, async (req, res, next) => {
  try {
    const progress = await Progress.findOne({ userId: req.userId });
    return res.json({ progress: normalizeProgress(progress) });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/progress/solved', requireAuth, async (req, res, next) => {
  try {
    const problemId = Number(req.body.problemId);
    if (!Number.isSafeInteger(problemId) || problemId < 1 || typeof req.body.solved !== 'boolean') {
      return res.status(400).json({ message: 'A valid problem ID and solved state are required.' });
    }
    const update = req.body.solved
      ? { $addToSet: { solved: problemId } }
      : { $pull: { solved: problemId } };
    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId },
      { ...update, $setOnInsert: { userId: req.userId } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.json({ progress: normalizeProgress(progress) });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/progress/submissions', requireAuth, async (req, res, next) => {
  try {
    const { problemId, problemTitle, language, code, status = 'Accepted' } = req.body;
    if (!Number.isSafeInteger(Number(problemId)) || Number(problemId) < 1 ||
        typeof problemTitle !== 'string' || !problemTitle.trim() ||
        typeof language !== 'string' || !language.trim() ||
        typeof code !== 'string' ||
        typeof status !== 'string' || !status.trim()) {
      return res.status(400).json({ message: 'Submission details are invalid.' });
    }
    const submission = {
      problemId: Number(problemId),
      problemTitle: problemTitle.trim(),
      language: language.trim(),
      code,
      status: status.replace(/\s*\(Demo\)/i, '').trim(),
      submittedAt: new Date(),
    };
    const updates = { $push: { submissions: { $each: [submission], $position: 0, $slice: 50 } } };
    if (submission.status === 'Accepted') {
      updates.$addToSet = { solved: submission.problemId };
    }
    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId },
      { ...updates, $setOnInsert: { userId: req.userId } },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );
    return res.status(201).json({ progress: normalizeProgress(progress) });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, '0.0.0.0', () => {
    console.log(`CodeQuest API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Unable to start the API server:', error);
  process.exitCode = 1;
});
