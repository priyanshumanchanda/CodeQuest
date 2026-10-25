import { ArrowRight, BookOpenText, ChartColumnBig, Code2, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  { title: 'Curated DSA Practice', text: 'Build mastery with focused algorithmic challenges across arrays, graphs, dynamic programming, and more.', icon: Code2 },
  { title: 'Progress Tracking', text: 'Monitor solved problems, topic-wise mastery, and streak momentum in one centralized dashboard.', icon: ChartColumnBig },
  { title: 'Structured Roadmaps', text: 'Follow guided learning plans designed for incremental, steady technical interview improvement.', icon: BookOpenText },
];

const stats = [
  { value: '50+', label: 'Coding challenges' },
  { value: '10+', label: 'DSA topics' },
  { value: '30K+', label: 'Practice hours' },
  { value: 'Easy / Med / Hard', label: 'Difficulty mix' },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const displayName = user?.fullName ? user.fullName.split(' ')[0] : 'Developer';

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-200">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Coding Platform
            </div>
            <h1 className="max-w-xl text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Master DSA. One Problem at a Time.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              CodeQuest empowers developers and students to sharpen problem-solving fundamentals with a polished, structured practice platform built for technical interview excellence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                to="/problems"
                className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
              >
                Explore Problems
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-300" /> 4.9/5 Student Rating</div>
              <div className="flex items-center gap-2 font-mono text-slate-400">Java & C++ Supported</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40">
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">Learning Dashboard</span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300 border border-emerald-500/20">Live Analytics</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                    <span>Overall Progress</span>
                    <span className="font-semibold text-white">68%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[68%] rounded-full bg-indigo-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Problems Solved</div>
                    <div className="mt-2 text-2xl font-bold text-white">34</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Current Streak</div>
                    <div className="mt-2 text-2xl font-bold text-emerald-400">14 days</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {['Arrays', 'Graphs', 'Trees'].map((topic, index) => (
                    <div key={topic} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>{topic}</span>
                        <span className="font-medium text-slate-200">{[85, 60, 75][index]}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className={`h-full rounded-full ${['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500'][index]}`} style={{ width: `${[85, 60, 75][index]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Why CodeQuest</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Engineered for Technical Interview Prep</h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">Master core data structures, optimize algorithm complexities, and walk into your next interview with complete confidence.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl transition hover:border-slate-700 hover:bg-slate-900/90">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
              <div className="text-3xl font-extrabold text-white sm:text-4xl">{value}</div>
              <div className="mt-2 text-sm font-medium text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-900 bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            {isAuthenticated
              ? `Welcome back, ${displayName}!`
              : 'Ready to elevate your problem-solving skills?'}
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            {isAuthenticated
              ? 'Jump right into your problem workspace and continue your algorithmic practice streak.'
              : 'Create your account now and start working through curated algorithmic challenges.'}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
              >
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
