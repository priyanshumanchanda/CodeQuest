import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, CircleAlert, Terminal, Sparkles, Check, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import DifficultyBadge from '../components/DifficultyBadge';
import { useProgress } from '../context/ProgressContext';
import { problems } from '../data/problems';

const languageOptions = ['Java', 'C++'];

export default function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markSolved, unmarkSolved, submitCode, progress } = useProgress();
  const problem = problems.find((item) => Number(item.id) === Number(id));

  const [language, setLanguage] = useState('Java');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(0);
  const [result, setResult] = useState(null);
  const [progressError, setProgressError] = useState('');

  // Sync starter code whenever language or problem changes
  useEffect(() => {
    if (!problem) return;
    const starter = problem.starterCode?.[language === 'Java' ? 'java' : 'cpp'] || '';
    setCode(starter);
    setResult(null);
  }, [language, problem]);

  const problemIndex = useMemo(
    () => problems.findIndex((item) => Number(item.id) === Number(id)),
    [id]
  );
  const previousProblem = problemIndex > 0 ? problems[problemIndex - 1] : null;
  const nextProblem = problemIndex >= 0 && problemIndex < problems.length - 1 ? problems[problemIndex + 1] : null;

  if (!problem) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10">
          <p className="text-lg font-semibold text-white">Problem not found</p>
          <button
            type="button"
            onClick={() => navigate('/problems')}
            className="mt-5 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to problems
          </button>
        </div>
      </div>
    );
  }

  const solvedList = Array.isArray(progress?.solved) ? progress.solved : [];
  const isSolved = solvedList.some((sId) => Number(sId) === Number(problem.id));

  const toggleSolved = async () => {
    setProgressError('');
    try {
      if (isSolved) {
        await unmarkSolved(problem.id);
      } else {
        await markSolved(problem.id);
      }
    } catch (error) {
      setProgressError(error.message || 'Unable to update your progress.');
    }
  };

  const handleReset = () => {
    const starter = problem.starterCode?.[language === 'Java' ? 'java' : 'cpp'] || '';
    setCode(starter);
    setResult(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setResult(null);

    setTimeout(() => {
      const examples = Array.isArray(problem.examples) && problem.examples.length > 0
        ? problem.examples
        : [{ input: 'N/A', output: 'N/A' }];

      const isLikelyValid = /return|System\.out|cout/i.test(code);
      const runtime = Math.floor(Math.random() * 25 + 25);
      const memory = (Math.random() * 2 + 40).toFixed(1);

      setResult({
        type: 'run',
        status: isLikelyValid ? 'Accepted' : 'Wrong Answer',
        runtime: `${runtime} ms`,
        memory: `${memory} MB`,
        message: isLikelyValid ? 'Sample test cases passed.' : 'Output did not match expected result.',
        cases: examples.map((ex, idx) => ({
          index: idx + 1,
          input: ex.input || 'N/A',
          expected: ex.output || 'N/A',
          actual: isLikelyValid ? ex.output : 'null',
          passed: isLikelyValid,
        })),
      });

      setIsRunning(false);
    }, 450);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setResult(null);

    setTimeout(async () => {
      const examples = Array.isArray(problem.examples) && problem.examples.length > 0
        ? problem.examples
        : [{ input: 'N/A', output: 'N/A' }];

      const isLikelyValid = /return|System\.out|cout/i.test(code);
      const status = isLikelyValid ? 'Accepted' : 'Wrong Answer';
      const runtime = Math.floor(Math.random() * 20 + 30);
      const memory = (Math.random() * 3 + 41).toFixed(1);

      const resObj = {
        type: 'submit',
        status,
        runtime: `${runtime} ms`,
        memory: `${memory} MB`,
        message: isLikelyValid
          ? `All ${examples.length + 10} test cases passed successfully!`
          : `Wrong Answer on test case 2.`,
        cases: examples.map((ex, idx) => ({
          index: idx + 1,
          input: ex.input || 'N/A',
          expected: ex.output || 'N/A',
          actual: isLikelyValid ? ex.output : 'null',
          passed: isLikelyValid,
        })),
      };

      setResult(resObj);

      try {
        await submitCode({
          problemId: problem.id,
          problemTitle: problem.title,
          language,
          code,
          status,
        });
        setProgressError('');
      } catch (error) {
        setProgressError(error.message || 'Unable to save your submission.');
      }

      setIsSubmitting(false);
    }, 600);
  };

  const examplesList = Array.isArray(problem.examples) ? problem.examples : [];
  const constraintsList = Array.isArray(problem.constraints) ? problem.constraints : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Navigation header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <button
            type="button"
            onClick={() => navigate('/problems')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200 hover:border-slate-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Problems Catalog
          </button>
        </div>

        <div className="flex items-center gap-2">
          {previousProblem ? (
            <button
              type="button"
              onClick={() => navigate(`/problems/${previousProblem.id}`)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:border-slate-600 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
          ) : null}
          {nextProblem ? (
            <button
              type="button"
              onClick={() => navigate(`/problems/${nextProblem.id}`)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:border-slate-600 transition"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.15fr]">
        {progressError ? (
          <div className="xl:col-span-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {progressError}
          </div>
        ) : null}
        {/* Left Column: Problem Information */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400 font-medium">Problem #{problem.id}</div>
                <h1 className="mt-2 text-3xl font-extrabold text-white">{problem.title}</h1>
              </div>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs uppercase tracking-[0.16em] text-indigo-200 font-medium">
                {problem.topic}
              </span>

              <button
                type="button"
                onClick={toggleSolved}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isSolved
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
                title={isSolved ? 'Click to mark as unsolved' : 'Click to mark as solved'}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 ${isSolved ? 'text-emerald-400' : 'text-slate-500'}`} />
                {isSolved ? 'Solved (Click to undo)' : 'Mark as Solved'}
              </button>
            </div>

            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">Problem Description</h3>
                <p className="leading-7 text-slate-300">{problem.description}</p>
              </div>

              {constraintsList.length > 0 && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Constraints</h3>
                  <ul className="list-inside list-disc space-y-1 text-slate-300">
                    {constraintsList.map((constraint) => (
                      <li key={constraint} className="font-mono text-sm">{constraint}</li>
                    ))}
                  </ul>
                </div>
              )}

              {examplesList.length > 0 && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Examples</h3>
                  <div className="space-y-3">
                    {examplesList.map((example, index) => (
                      <div key={`${example.input}-${index}`} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Example {index + 1}</div>
                        <div>
                          <div className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-400 font-medium">Input</div>
                          <pre className="whitespace-pre-wrap font-mono text-sm text-slate-200">{example.input}</pre>
                        </div>
                        <div>
                          <div className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-400 font-medium">Output</div>
                          <pre className="whitespace-pre-wrap font-mono text-sm text-emerald-300">{example.output}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">Hints</h3>
                <ul className="list-inside list-disc space-y-2 text-slate-300 text-sm leading-relaxed">
                  <li>Break the problem into smaller logical components.</li>
                  <li>Consider boundary conditions, empty cases, and integer ranges.</li>
                  <li>Click <strong className="text-white">Run Code</strong> to test sample cases before submitting.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Panel */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                <Terminal className="h-4 w-4 text-indigo-400" />
                Code Workspace
              </div>

              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
              >
                {languageOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <CodeEditor
              problem={problem}
              language={language}
              starterCode={problem.starterCode?.[language === 'Java' ? 'java' : 'cpp'] || ''}
              currentCode={code}
              onCodeChange={setCode}
              onReset={handleReset}
              onRun={handleRun}
              onSubmit={handleSubmit}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Execution Output Panel */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-semibold text-white">
                <ChevronRight className="h-5 w-5 text-indigo-400" />
                Execution Results
              </div>
              {result && (
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>Runtime: <strong className="text-slate-200">{result.runtime}</strong></span>
                  <span>Memory: <strong className="text-slate-200">{result.memory}</strong></span>
                </div>
              )}
            </div>

            {result ? (
              <div className="space-y-4">
                <div className={`flex items-center justify-between rounded-2xl p-4 border ${
                  result.status === 'Accepted'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                }`}>
                  <div className="flex items-center gap-2.5 font-semibold text-base">
                    {result.status === 'Accepted' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    ) : (
                      <CircleAlert className="h-5 w-5 text-amber-400 shrink-0" />
                    )}
                    <span>{result.status}</span>
                  </div>
                  <span className="text-xs text-slate-300">{result.message}</span>
                </div>

                {/* Test case tabs */}
                {Array.isArray(result.cases) && result.cases.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      {result.cases.map((c, idx) => (
                        <button
                          key={c.index}
                          type="button"
                          onClick={() => setActiveTestCaseTab(idx)}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            activeTestCaseTab === idx
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${c.passed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          Case {c.index}
                        </button>
                      ))}
                    </div>

                    {result.cases[activeTestCaseTab] && (
                      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                        <div>
                          <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1">Input:</div>
                          <pre className="text-slate-200 whitespace-pre-wrap">{result.cases[activeTestCaseTab].input}</pre>
                        </div>
                        <div>
                          <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1">Expected Output:</div>
                          <pre className="text-emerald-400 whitespace-pre-wrap">{result.cases[activeTestCaseTab].expected}</pre>
                        </div>
                        <div>
                          <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1">Actual Output:</div>
                          <pre className={`whitespace-pre-wrap ${result.cases[activeTestCaseTab].passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {result.cases[activeTestCaseTab].actual}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950 p-8 text-center text-sm text-slate-400">
                Click <span className="font-semibold text-slate-200">Run Code</span> to test against sample test cases, or <span className="font-semibold text-emerald-400">Submit</span> to evaluate your full solution and mark it as solved.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
