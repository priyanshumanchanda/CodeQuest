import { Save, Shield, UserCheck, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.fullName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim()) {
      setError('Display name cannot be empty.');
      return;
    }

    updateProfile({ fullName: name.trim() });
    setMessage('Profile settings saved successfully.');
    setTimeout(() => setMessage(''), 3500);
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!currentPassword || !newPassword) {
      setError('Please provide your current and new password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    updateProfile({ password: newPassword });
    setCurrentPassword('');
    setNewPassword('');
    setMessage('Password changed successfully.');
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">Settings</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Account Preferences</h1>
      </div>

      {message ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Profile Information</h2>
            <p className="text-xs text-slate-400">Update your public display name</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <label className="block text-sm text-slate-300 font-medium">
            Display Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-slate-100 outline-none focus:border-indigo-500 transition"
              placeholder="Your full name"
            />
          </label>

          <label className="block text-sm text-slate-300 font-medium">
            Email Address
            <input
              disabled
              value={user?.email || 'alex.rivera@codequest.io'}
              className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3.5 py-2.5 text-slate-400 outline-none cursor-not-allowed"
            />
          </label>

          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20">
            <Save className="h-4 w-4" />
            Save Profile
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Security & Password</h2>
            <p className="text-xs text-slate-400">Ensure your account remains secure</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-300 font-medium">
              Current Password
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-slate-100 outline-none focus:border-indigo-500 transition"
              />
            </label>
            <label className="block text-sm text-slate-300 font-medium">
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-slate-100 outline-none focus:border-indigo-500 transition"
              />
            </label>
          </div>

          <button type="submit" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition">
            <Shield className="h-4 w-4 text-emerald-400" />
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
