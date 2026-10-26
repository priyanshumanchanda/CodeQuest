import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProblemCard from '../components/ProblemCard';
import { useProgress } from '../context/ProgressContext';
import { problems } from '../data/problems';

const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
const topicOptions = ['All', ...new Set(problems.map((problem) => problem.topic))];
const statusOptions = ['All', 'Solved', 'Unsolved'];
const sortOptions = ['Recommended', 'Title A-Z', 'Difficulty', 'Topic'];

const pageSize = 9;

export default function Problems() {
  const { progress } = useProgress();
  const solvedSet = new Set(progress.solved);

  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [topic, setTopic] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [page, setPage] = useState(1);

  const filteredProblems = useMemo(() => {
    const trimmedQuery = search.trim().toLowerCase();
    let next = [...problems];

    if (trimmedQuery) {
      next = next.filter((problem) => `${problem.id} ${problem.title} ${problem.topic}`.toLowerCase().includes(trimmedQuery));
    }

    if (difficulty !== 'All') {
      next = next.filter((problem) => problem.difficulty === difficulty);
    }

    if (topic !== 'All') {
      next = next.filter((problem) => problem.topic === topic);
    }

    if (status !== 'All') {
      next = next.filter((problem) =>
        status === 'Solved' ? solvedSet.has(problem.id) : !solvedSet.has(problem.id)
      );
    }

    if (sortBy === 'Title A-Z') {
      next.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Difficulty') {
      const weight = { Easy: 1, Medium: 2, Hard: 3 };
      next.sort((a, b) => weight[a.difficulty] - weight[b.difficulty]);
    } else if (sortBy === 'Topic') {
      next.sort((a, b) => a.topic.localeCompare(b.topic));
    } else {
      next.sort((a, b) => {
        const aSolved = solvedSet.has(a.id) ? 1 : 0;
        const bSolved = solvedSet.has(b.id) ? 1 : 0;
        return aSolved - bSolved || a.id - b.id;
      });
    }

    return next;
  }, [difficulty, search, solvedSet, sortBy, status, topic]);

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / pageSize));
  const currentPageProbs = filteredProblems.slice((page - 1) * pageSize, page * pageSize);

  const resetFilters = () => {
    setSearch('');
    setDifficulty('All');
    setTopic('All');
    setStatus('All');
    setSortBy('Recommended');
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">Practice library</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white">Coding problems</h1>
        </div>
        <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
          {filteredProblems.length} problems available
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.9fr]">
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent py-3 text-slate-100 outline-none placeholder:text-slate-500"
              placeholder="Search by title or topic"
            />
          </div>

          <select value={difficulty} onChange={(event) => { setDifficulty(event.target.value); setPage(1); }} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none">
            {difficultyOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <select value={topic} onChange={(event) => { setTopic(event.target.value); setPage(1); }} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none">
            {topicOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none">
            {statusOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setPage(1); }} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none">
            {sortOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-slate-600">
            <X className="h-4 w-4" />
            Clear Filters
          </button>
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
            <SlidersHorizontal className="h-4 w-4 text-indigo-300" />
            Filtered results: {filteredProblems.length}
          </div>
        </div>
      </div>

      {currentPageProbs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center text-slate-400">
          No problems match the current search and filter criteria.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {currentPageProbs.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} solved={solvedSet.has(problem.id)} />
          ))}
        </div>
      )}

      {filteredProblems.length > pageSize ? (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-slate-300">Page {page} of {totalPages}</span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
