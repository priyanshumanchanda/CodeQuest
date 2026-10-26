import { FileCode2, CheckCircle2, Clock } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export default function Submissions() {
  const { progress } = useProgress();
  const submissionsList = Array.isArray(progress?.submissions) ? progress.submissions : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">Submission history</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">Your recent work</h1>
      </div>

      {submissionsList.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-12 text-center text-slate-400">
          No submissions recorded yet. Select any challenge from the problem catalog to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {submissionsList.map((submission) => (
            <div key={submission.id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-indigo-200 font-semibold border border-indigo-500/20">
                      #{submission.problemId}
                    </span>
                    <h2 className="text-xl font-semibold text-white">{submission.problemTitle}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <span>Language: <strong className="text-slate-200 font-mono">{submission.language}</strong></span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      {new Date(submission.submittedAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${submission.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'}`}>
                  {submission.status === 'Accepted' ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                  {submission.status}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <FileCode2 className="h-4 w-4 text-indigo-300" />
                  Code Snapshot
                </div>
                <pre className="max-h-56 overflow-auto whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300">
                  {submission.code || 'No code recorded for this submission.'}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
