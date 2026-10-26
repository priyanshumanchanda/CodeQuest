import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';

export default function ProblemCard({ problem, solved }) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20 transition duration-200 hover:-translate-y-1 hover:border-indigo-300/20 hover:bg-slate-900">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            #{problem.id} · {problem.topic}
          </div>
          <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
        </div>
        {solved ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Solved
          </span>
        ) : null}
      </div>

      <p className="mb-5 min-h-[56px] text-sm leading-6 text-slate-400">{problem.description}</p>

      <div className="mb-4 flex items-center justify-between">
        <DifficultyBadge difficulty={problem.difficulty} />
        <span className="text-xs uppercase tracking-[0.12em] text-slate-400">{problem.topic}</span>
      </div>

      <Link
        to={`/problems/${problem.id}`}
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
      >
        View problem
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
