import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, default: 'Software Engineer' },
  },
  { timestamps: true }
);

const submissionSchema = new mongoose.Schema(
  {
    problemId: { type: Number, required: true },
    problemTitle: { type: String, required: true, maxlength: 160 },
    language: { type: String, required: true, maxlength: 40 },
    code: { type: String, required: true, maxlength: 100000 },
    status: { type: String, required: true, maxlength: 60 },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    solved: { type: [Number], default: [] },
    submissions: { type: [submissionSchema], default: [] },
    streak: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Progress = mongoose.model('Progress', progressSchema);
