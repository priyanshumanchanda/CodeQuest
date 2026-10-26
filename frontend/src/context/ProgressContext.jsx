import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { problems } from '../data/problems';
import { useAuth } from './AuthContext';
import { apiRequest } from '../utils/api';

const ProgressContext = createContext(null);

const defaultProgress = {
  solved: [],
  submissions: [],
  streak: 0,
};

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(defaultProgress);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setProgress(defaultProgress);
    setError('');

    if (user) {
      apiRequest('/api/progress')
        .then(({ progress: savedProgress }) => {
          if (active) setProgress(savedProgress);
        })
        .catch((loadError) => {
          if (!active) return;
          setError(loadError.message);
          console.error('Unable to load saved progress:', loadError);
        });
    }

    return () => {
      active = false;
    };
  }, [user?.id]);

  const saveProgress = async (path, body) => {
    if (!user) {
      throw new Error('Sign in to save your progress.');
    }
    const { progress: savedProgress } = await apiRequest(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    setProgress(savedProgress);
    setError('');
    return savedProgress;
  };

  const submitCode = async ({ problemId, problemTitle, language, code, status = 'Accepted' }) => {
    if (!problemId || !problemTitle || !language) {
      throw new Error('Submission details are incomplete.');
    }
    const cleanStatus = status.replace(/\s*\(Demo\)/i, '').trim();
    return saveProgress('/api/progress/submissions', {
      problemId: Number(problemId),
      problemTitle,
      language,
      code,
      status: cleanStatus,
    });
  };

  const setSolved = (problemId, solved) => saveProgress('/api/progress/solved', {
    problemId: Number(problemId),
    solved,
  });

  const markSolved = (problemId) => setSolved(problemId, true);
  const unmarkSolved = (problemId) => setSolved(problemId, false);

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
    const completionPercentage = totalProblems > 0
      ? Math.round((solvedCount / totalProblems) * 100)
      : 0;

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
      error,
      submitCode,
      submitDemo: submitCode,
      markSolved,
      unmarkSolved,
    }),
    [progress, stats, error, user?.id]
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
