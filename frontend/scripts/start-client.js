import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const apiHealthUrl = 'http://localhost:4000/api/health';
const deadline = Date.now() + 120_000;

async function waitForApi() {
  while (Date.now() < deadline) {
    try {
      const response = await fetch(apiHealthUrl, { signal: AbortSignal.timeout(2000) });
      if (response.ok) return;
    } catch {
      // The API may still be starting or connecting to MongoDB.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`API did not become ready within 120 seconds (${apiHealthUrl}).`);
}

async function startVite() {
  try {
    await waitForApi();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const viteCandidates = [
    new URL('../node_modules/vite/bin/vite.js', import.meta.url),
    new URL('../../node_modules/vite/bin/vite.js', import.meta.url),
  ];
  const viteUrl = viteCandidates.find((candidate) => existsSync(fileURLToPath(candidate)));
  if (!viteUrl) {
    console.error('Vite is not installed. Run npm install from the repository root.');
    process.exitCode = 1;
    return;
  }
  const vitePath = fileURLToPath(viteUrl);
  const vite = spawn(process.execPath, [vitePath, '--host', '0.0.0.0'], {
    stdio: 'inherit',
    windowsHide: true,
  });

  vite.on('error', (error) => {
    console.error('Unable to start Vite:', error);
    process.exitCode = 1;
  });

  vite.on('exit', (code, signal) => {
    process.exitCode = signal ? 1 : code ?? 1;
  });

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      if (!vite.killed) vite.kill(signal);
    });
  }
}

startVite();
