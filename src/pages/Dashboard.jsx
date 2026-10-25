import { Activity, CheckCircle2, Flame, Target, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { problems } from '../data/problems';

const topicLabels = [...new Set(problems.map((problem) => problem.topic))];

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, progress } = useProgress();

  const solvedSet = useMemo(() => {
    if (stats?.solvedSet instanceof Set) return stats.solvedSet;
    const list = Array.isArray(progress?.solved) ? progress.solved : [];
    return new Set(list.map(Number));
  }, [stats, progress]);

  const topicProgress = useMemo(() => {
    return topicLabels.map((topic) => {
      const list = problems.filter((problem) => problem.topic === topic);
      const solved = list.filter((problem) => solvedSet.has(Number(problem.id))).length;
      return {
        topic,
        solved,
        total: list.length,
        percent: list.length > 0 ? Math.round((solved / list.length) * 100) : 0,
      };
    });
  }, [solvedSet]);

  const recommended = useMemo(() => {
    return problems.filter((problem) => !solvedSet.has(Number(problem.id))).slice(0, 3);
  }, [solvedSet]);

  const solvedCount = stats?.solvedCount ?? solvedSet.size;
  const streak = Math.min(15, Math.max(0, solvedCount + 3));
  const completionPercentage = stats?.completionPercentage ?? 0;
  const submissionsList = Array.isArray(progress?.submissions) ? progress.submissions : [];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 p-4 md:p-6 lg:p-8">
      <main className="space-y-6 max-w-6xl mx-auto">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-300 font-medium">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Welcome back, {user?.fullName || 'Developer'}.
              </h1>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200">
              Current streak: {streak} days
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'Total solved', value: solvedCount, icon: CheckCircle2, accent: 'text-emerald-300' },
            { label: 'Attempted', value: stats?.attemptedCount ?? 0, icon: Activity, accent: 'text-indigo-300' },
            { label: 'Easy', value: stats?.easySolved ?? 0, icon: Target, accent: 'text-emerald-300' },
            { label: 'Medium', value: stats?.mediumSolved ?? 0, icon: TrendingUp, accent: 'text-amber-300' },
            { label: 'Hard', value: stats?.hardSolved ?? 0, icon: Flame, accent: 'text-rose-300' },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-400">{label}</span>
                <Icon className={`h-4 w-4 ${accent}`} />
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Completion overview</h2>
              <span className="text-sm text-slate-400 font-medium">{completionPercentage}%</span>
            </div>
            <ProgressBar label="Overall completion" value={completionPercentage} color="bg-indigo-500" />

            {solvedCount === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-center text-sm text-slate-400">
                No problems solved yet. Pick a challenge and start building momentum.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {topicProgress.slice(0, 6).map(({ topic, solved, total, percent }) => (
                  <div key={topic}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>{topic}</span>
                      <span>{solved}/{total}</span>
                    </div>
                    <ProgressBar label="" value={percent} color="bg-emerald-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-5 text-xl font-semibold text-white">Recent activity</h2>

            {submissionsList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400 text-center">
                Your recent coding activity will appear here after your first submission.
              </div>
            ) : (
              <div className="space-y-3">
                {submissionsList.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-white">{submission.problemTitle}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </div>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        submission.status === 'Accepted'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-5 text-xl font-semibold text-white">Recommended problems</h2>
            <div className="space-y-3">
              {recommended.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400 text-center">
                  You have completed all available problems. Outstanding work!
                </div>
              ) : (
                recommended.map((problem) => (
                  <Link
                    key={problem.id}
                    to={`/problems/${problem.id}`}
                    className="block rounded-2xl border border-slate-800 bg-slate-950 p-3.5 transition hover:border-slate-700 hover:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          #{problem.id} · {problem.topic}
                        </div>
                        <div className="mt-1 font-medium text-white">{problem.title}</div>
                      </div>
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-300 font-semibold">
                        {problem.difficulty}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-5 text-xl font-semibold text-white">Topic-wise progress</h2>
            <div className="space-y-4">
              {topicProgress.map(({ topic, solved, total, percent }) => (
                <div key={topic}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{topic}</span>
                    <span>{solved}/{total}</span>
                  </div>
                  <ProgressBar label="" value={percent} color="bg-indigo-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
