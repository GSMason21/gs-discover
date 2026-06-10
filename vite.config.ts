import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// ─────────────────────────────────────────────────────────────────────────────
// Multi-page app config.
// To add a new quiz: add one entry here pointing to quizzes/[slug]/index.html
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        // Root redirect page
        main: resolve(__dirname, 'index.html'),
        // Quizzes — add new entries here
        'innovation-explorer': resolve(__dirname, 'quizzes/innovation-explorer/index.html'),
        'leadership':          resolve(__dirname, 'quizzes/leadership/index.html'),
      },
    },
  },
});
