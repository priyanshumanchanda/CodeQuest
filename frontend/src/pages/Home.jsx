import { ArrowRight, BookOpenText, ChartColumnBig, Code2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { problems } from '../data/problems';

const features = [
  { title: 'Curated DSA Practice', text: 'Build mastery with focused algorithmic challenges across arrays, graphs, dynamic programming, and more.', icon: Code2 },
  { title: 'Progress Tracking', text: 'Monitor solved problems, topic-wise mastery, and streak momentum in one centralized dashboard.', icon: ChartColumnBig },
  { title: 'Structured Roadmaps', text: 'Follow guided learning plans designed for incremental, steady technical interview improvement.', icon: BookOpenText },
];

const stats = [
  { value: problems.length, label: 'Curated challenges' },
  { value: new Set(problems.map((problem) => problem.topic)).size, label: 'Core DSA topics' },
  { value: 'Java + C++', label: 'Editor languages' },
  { value: 'Easy · Medium · Hard', label: 'Difficulty levels' },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const displayName = user?.fullName ? user.fullName.split(' ')[0] : 'Developer';

  return (
    <div className="text-slate-100">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-200">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              A calmer way to get interview-ready
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.25rem]">
              Think clearly.
              <span className="block text-indigo-300">
                Code confidently.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Build strong problem-solving habits with focused challenges, a clean coding workspace, and progress that stays yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
                >
                  Start practicing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                to="/problems"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Explore challenges
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />Java and C++ workspace</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />Progress saved to your account</div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-7">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">CodeQuest workspace</div>
                    <div className="mt-1 text-sm text-slate-400">A little progress, every day.</div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-indigo-200">
                    <Code2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Your next challenge</div>
                      <div className="mt-2 text-xl font-bold text-white">Find your rhythm</div>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                        Choose a problem, explore a pattern, and keep your solutions in one place.
                      </p>
                    </div>
                    <span className="rounded-full border border-indigo-300/15 bg-indigo-300/[0.08] px-2.5 py-1 text-[11px] font-medium text-indigo-200">
                      Your pace
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { number: '01', label: 'Explore' },
                    { number: '02', label: 'Practice' },
                    { number: '03', label: 'Improve' },
                  ].map(({ number, label }) => (
                    <div key={number} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                      <div className="font-mono text-xs text-indigo-300">{number}</div>
                      <div className="mt-1.5 text-sm font-medium text-slate-300">{label}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-white/[0.06] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">Built for steady progress</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Everything you need to keep improving</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">A focused place to practice core concepts, track your work, and follow a clear learning path.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition duration-200 hover:-translate-y-1 hover:border-indigo-300/20 hover:bg-white/[0.04]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-300/15 bg-indigo-400/10 text-indigo-200">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
              <div className="text-2xl font-extrabold text-white sm:text-3xl">{value}</div>
              <div className="mt-2 text-sm font-medium text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-slate-900/50 py-16">
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
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
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
