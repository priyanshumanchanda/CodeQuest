import { Eye, EyeOff, LockKeyhole, Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { readStorage } from '../utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // If already authenticated, redirect to dashboard
  const hasStoredSession = Boolean(
    readStorage('codequest_auth_user', null) ||
    readStorage('codequest-demo-current-user', null)
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated || hasStoredSession) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    try {
      const loggedUser = login({ email, password });
      if (loggedUser) {
        navigate('/dashboard', { replace: true });
      }
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (testEmail, testPassword) => {
    setEmail(testEmail);
    setPassword(testPassword);
    setError('');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/40 lg:grid-cols-2">
        <div className="hidden bg-slate-950/90 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-200">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome back
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Continue your algorithmic journey.</h1>
            <p className="mt-4 max-w-sm text-slate-300 leading-relaxed">
              Sign in to track your problem-solving progress, review past submissions, and practice interview patterns.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="text-sm font-semibold text-white">What's waiting for you</div>
              <ul className="mt-3 space-y-2.5 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>50+ curated algorithm challenges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Interactive code editor with Java & C++</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Detailed submission metrics & topic roadmaps</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3.5 text-xs text-indigo-200">
              <span className="font-semibold block mb-1">Quick Test Login (Click to fill):</span>
              <div className="flex flex-wrap gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => handleQuickFill('alex.rivera@codequest.io', 'password123')}
                  className="rounded-lg bg-indigo-600/30 border border-indigo-400/30 px-2.5 py-1 text-indigo-100 hover:bg-indigo-600/50 transition font-mono"
                >
                  alex.rivera@codequest.io
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('demo@codequest.dev', 'demo123')}
                  className="rounded-lg bg-indigo-600/30 border border-indigo-400/30 px-2.5 py-1 text-indigo-100 hover:bg-indigo-600/50 transition font-mono"
                >
                  demo@codequest.dev
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">Sign In</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Access your account</h2>
            <p className="mt-2 text-sm text-slate-400">Enter your credentials to continue</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email Address</span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 focus-within:border-indigo-500 transition">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    setError('Use alex.rivera@codequest.io with password: password123');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 focus-within:border-indigo-500 transition">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                />
                <span className="text-xs text-slate-300">Remember me</span>
              </label>
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
