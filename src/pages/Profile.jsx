import { Calendar, Mail, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { problems } from '../data/problems';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { stats } = useProgress();
  const [name, setName] = useState(user?.fullName || '');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    updateProfile({ fullName: name.trim() });
    setSavedMessage('Display name updated successfully.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const topicProgress = [...new Set(problems.map((problem) => problem.topic))].map((topic) => {
    const list = problems.filter((problem) => problem.topic === topic);
    const solved = list.filter((problem) => stats?.solvedSet?.has(problem.id) || false).length;
    return {
      topic,
      solved,
      total: list.length,
      percent: Math.round((solved / list.length) * 100),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">Profile</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Developer Profile</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30">
              <UserRound className="h-8 w-8" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{user?.fullName || 'Alex Rivera'}</div>
              <div className="text-sm text-slate-400">{user?.email || 'alex.rivera@codequest.io'}</div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-300">
              <Mail className="h-4 w-4 text-indigo-400" />
              {user?.email || 'alex.rivera@codequest.io'}
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-sm text-slate-300">
              <Calendar className="h-4 w-4 text-indigo-400" />
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'October 2026'}
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <label className="block text-sm text-slate-300 font-medium">
              Display Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-slate-100 outline-none focus:border-indigo-500 transition"
              />
            </label>
            {savedMessage ? (
              <div className="text-xs text-emerald-400 font-medium">{savedMessage}</div>
            ) : null}
            <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20">
              Save Changes
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">Total Solved</div>
              <div className="mt-2 text-3xl font-bold text-white">{stats.solvedCount}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">Easy</div>
              <div className="mt-2 text-3xl font-bold text-emerald-400">{stats.easySolved}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">Medium</div>
              <div className="mt-2 text-3xl font-bold text-amber-400">{stats.mediumSolved}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">Hard</div>
              <div className="mt-2 text-3xl font-bold text-rose-400">{stats.hardSolved}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="mb-5 text-xl font-semibold text-white">Topic Mastery Breakdown</h2>
            <div className="space-y-4">
              {topicProgress.slice(0, 8).map(({ topic, solved, total, percent }) => (
                <div key={topic}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{topic}</span>
                    <span className="font-mono text-slate-400">{solved}/{total} ({percent}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
