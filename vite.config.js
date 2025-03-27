
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
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
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
