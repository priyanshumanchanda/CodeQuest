import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { BookOpenCheck, RotateCcw, Play, Send, Loader2 } from 'lucide-react';

export default function CodeEditor({
  problem,
  language,
  starterCode,
  currentCode,
  onCodeChange,
  onReset,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
}) {
  const [editorValue, setEditorValue] = useState(currentCode || starterCode || '');

  useEffect(() => {
    setEditorValue(currentCode || starterCode || '');
  }, [starterCode]);

  const handleEditorChange = (value) => {
    const val = value || '';
    setEditorValue(val);
    onCodeChange(val);
  };

  const editorLanguage = language === 'Java' ? 'java' : 'cpp';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
          <BookOpenCheck className="h-4 w-4 text-indigo-400" />
          Solution Editor
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-700 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>

          <button
            type="button"
            onClick={onRun}
            disabled
            title="Code execution is currently unavailable."
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-400 opacity-50 transition"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
            ) : (
              <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
            )}
            Run Code
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled
            title="Code submission is currently unavailable."
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-400 opacity-50 transition"
          >
            {isSubmitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Submit
          </button>
        </div>
      </div>

      <div className="relative h-[400px] border-b border-slate-800">
        <Editor
          height="100%"
          language={editorLanguage}
          theme="vs-dark"
          value={editorValue}
          onChange={handleEditorChange}
          loading={
            <div className="flex h-full items-center justify-center bg-slate-950 text-sm text-slate-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-indigo-400" />
              Loading Code Editor...
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbersMinChars: 3,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 12 },
          }}
        />
      </div>

      <div className="flex items-center justify-between bg-slate-900/95 px-4 py-2.5 text-xs text-slate-400 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-medium text-slate-300">Editor Ready</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Spaces: 4</span>
          <span>UTF-8</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-indigo-300 border border-slate-700">
            {language}
          </span>
        </div>
      </div>
    </div>
  );
}
