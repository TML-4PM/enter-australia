
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
  // Dynamically import the componentTagger if in development mode
  let componentTaggerPlugin = null;
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger');
      componentTaggerPlugin = componentTagger();
    } catch (error) {
      console.warn('Failed to load lovable-tagger:', error);
    }
  }

  return {
    root: '.',
    publicDir: 'public',
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    server: {
      host: "::",
      port: 8080
    },
    plugins: [
      react(),
      componentTaggerPlugin,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
