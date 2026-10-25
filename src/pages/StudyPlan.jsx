import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { problems } from '../data/problems';

const roadmap = [
  'Arrays',
  'Strings',
  'Searching and Sorting',
  'Linked Lists',
  'Stacks and Queues',
  'Trees',
  'Heaps',
  'Greedy Algorithms',
  'Dynamic Programming',
  'Graphs',
];

const topicMeta = {
  Arrays: 'Master array manipulation, indexing, and efficient traversal patterns.',
  Strings: 'Practice substring logic, pattern matching, and character-based transforms.',
  'Searching and Sorting': 'Understand search strategies and ordering techniques used in interviews.',
  'Linked Lists': 'Focus on pointer updates, cycles, and common list operations.',
  'Stacks and Queues': 'Build comfort with LIFO and FIFO structures and stack-based algorithms.',
  Trees: 'Explore traversal, depth, and binary-search-tree logic.',
  Heaps: 'Get familiar with priority queues and top-k problem patterns.',
  'Greedy Algorithms': 'Learn locally optimal choices that lead to globally optimal results.',
  'Dynamic Programming': 'Recognize overlapping subproblems and optimize repeated work.',
  Graphs: 'Study traversal, connectivity, shortest paths, and cycle detection.',
};

const practiceCounts = {
  Arrays: 8,
  Strings: 7,
  'Searching and Sorting': 6,
  'Linked Lists': 5,
  'Stacks and Queues': 5,
  Trees: 7,
  Heaps: 4,
  'Greedy Algorithms': 5,
  'Dynamic Programming': 8,
  Graphs: 6,
};

export default function StudyPlan() {
  const { stats } = useProgress();
  const solvedSet = stats?.solvedSet instanceof Set ? stats.solvedSet : new Set();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">Study roadmap</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Beginner-friendly DSA path</h1>
      </div>

      <div className="space-y-4">
        {roadmap.map((topic) => {
          const topicProblems = problems.filter((problem) =>
            topic === 'Trees' ? problem.topic === 'Trees and Binary Search Trees' :
            topic === 'Graphs' ? problem.topic === 'Graphs' :
            topic === 'Arrays' ? problem.topic === 'Arrays' :
            topic === 'Strings' ? problem.topic === 'Strings' :
            topic === 'Linked Lists' ? problem.topic === 'Linked Lists' :
            topic === 'Stacks and Queues' ? problem.topic === 'Stacks and Queues' :
            topic === 'Heaps' ? problem.topic === 'Heaps' :
            topic === 'Greedy Algorithms' ? problem.topic === 'Greedy Algorithms' :
            topic === 'Dynamic Programming' ? problem.topic === 'Dynamic Programming' :
            problem.topic === 'Sorting' || problem.topic === 'Binary Search'
          );

          const solvedCount = topicProblems.filter((problem) => solvedSet.has(problem.id)).length;
          const total = Math.max(topicProblems.length, practiceCounts[topic] || 1);
          const percent = Math.min(100, Math.round((solvedCount / total) * 100));

          return (
            <div key={topic} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white">{topic}</h2>
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">{topicProblems.length} problems</span>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">{topicMeta[topic]}</p>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <div className="text-sm text-slate-300">Completion: {percent}%</div>
                  <Link to="/problems" className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-400">
                    Start Practicing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
