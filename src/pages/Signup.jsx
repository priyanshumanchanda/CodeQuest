import { Eye, EyeOff, LockKeyhole, Mail, UserRound, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { readStorage } from '../utils/storage';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const hasStoredSession = Boolean(
    readStorage('codequest_auth_user', null) ||
    readStorage('codequest-demo-current-user', null)
  );

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated || hasStoredSession) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      setSuccess('Account created successfully! Redirecting to your dashboard...');
      setTimeout(() => navigate('/dashboard', { replace: true }), 400);
    } catch (signupError) {
      setError(signupError.message || 'Unable to create account. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/40 lg:grid-cols-2">
        <div className="hidden bg-slate-950/90 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Join CodeQuest
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Accelerate your coding career.</h1>
            <p className="mt-4 max-w-sm text-slate-300 leading-relaxed">
              Join thousands of engineers practicing algorithms, data structures, and technical interview problem solving.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="text-sm font-semibold text-white">Platform features</div>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Full access to 50+ curated DSA problems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Integrated Monaco code editor with multi-language support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Personalized analytics & topic mastery tracking</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">Register</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-sm text-slate-400">Get started with your free developer account today</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Full Name</span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 focus-within:border-indigo-500 transition">
                <UserRound className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Alex Rivera"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email Address</span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 focus-within:border-indigo-500 transition">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="alex.rivera@example.com"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 focus-within:border-indigo-500 transition">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Minimum 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Confirm Password</span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 focus-within:border-indigo-500 transition">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Re-enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {error ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-200">
                {error}
              </div>
            ) : null}
            {success ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-200">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
