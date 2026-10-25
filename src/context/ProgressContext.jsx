import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { readStorage, writeStorage } from '../utils/storage';
import { problems } from '../data/problems';

const ProgressContext = createContext(null);
const PROGRESS_KEY = 'codequest_progress';
const LEGACY_PROGRESS_KEY = 'codequest-demo-progress';

const defaultProgress = {
  solved: [],
  submissions: [],
  streak: 0,
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const raw = readStorage(PROGRESS_KEY, null) || readStorage(LEGACY_PROGRESS_KEY, null);
    return {
      solved: Array.isArray(raw?.solved) ? raw.solved : [],
      submissions: Array.isArray(raw?.submissions) ? raw.submissions : [],
      streak: typeof raw?.streak === 'number' ? raw.streak : 0,
    };
  });

  useEffect(() => {
    writeStorage(PROGRESS_KEY, progress);
  }, [progress]);

  const submitCode = ({ problemId, problemTitle, language, code, status = 'Accepted' }) => {
    if (!problemId || !problemTitle || !language) {
      return;
    }

    const cleanStatus = status.replace(/\s*\(Demo\)/i, '').trim();
    const isAccepted = cleanStatus === 'Accepted';

    const submission = {
      id: `${problemId}-${Date.now()}`,
      problemId: Number(problemId),
      problemTitle,
      language,
      code,
      status: cleanStatus,
      submittedAt: new Date().toISOString(),
      result: cleanStatus,
    };

    setProgress((current) => {
      const currentSolved = Array.isArray(current?.solved) ? current.solved : [];
      const currentSubs = Array.isArray(current?.submissions) ? current.submissions : [];

      const solved = isAccepted
        ? Array.from(new Set([...currentSolved, Number(problemId)]))
        : currentSolved;

      return {
        ...current,
        solved,
        submissions: [submission, ...currentSubs].slice(0, 50),
      };
    });
  };

  const markSolved = (problemId) => {
    setProgress((current) => {
      const currentSolved = Array.isArray(current?.solved) ? current.solved : [];
      return {
        ...current,
        solved: Array.from(new Set([...currentSolved, Number(problemId)])),
      };
    });
  };

  const unmarkSolved = (problemId) => {
    setProgress((current) => {
      const currentSolved = Array.isArray(current?.solved) ? current.solved : [];
      return {
        ...current,
        solved: currentSolved.filter((id) => Number(id) !== Number(problemId)),
      };
    });
  };

  const stats = useMemo(() => {
    const solvedList = Array.isArray(progress?.solved) ? progress.solved : [];
    const subsList = Array.isArray(progress?.submissions) ? progress.submissions : [];
    const solvedSet = new Set(solvedList.map(Number));
    const totalProblems = problems.length;
    const solvedCount = solvedSet.size;

    const easySolved = problems.filter(
      (problem) => problem.difficulty === 'Easy' && solvedSet.has(problem.id)
    ).length;
    const mediumSolved = problems.filter(
      (problem) => problem.difficulty === 'Medium' && solvedSet.has(problem.id)
    ).length;
    const hardSolved = problems.filter(
      (problem) => problem.difficulty === 'Hard' && solvedSet.has(problem.id)
    ).length;

    const attemptedCount = new Set(
      subsList.map((submission) => Number(submission.problemId))
    ).size;

    const completionPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    return {
      solvedCount,
      attemptedCount,
      easySolved,
      mediumSolved,
      hardSolved,
      completionPercentage,
      totalProblems,
      solvedSet,
      recentActivity: subsList.slice(0, 5),
    };
  }, [progress]);

  const value = useMemo(
    () => ({
      progress,
      stats,
      submitCode,
      submitDemo: submitCode,
      markSolved,
      unmarkSolved,
      setProgress,
    }),
    [progress, stats]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider.');
  }
  return context;
}
