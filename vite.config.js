
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// Only import the component tagger in development mode
const loadTagger = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Use dynamic import for ESM modules
      const taggerModule = await import("lovable-tagger");
      return taggerModule.componentTagger;
    } catch (e) {
      console.warn("Could not load lovable-tagger, continuing without it:", e);
      return null;
    }
  }
  return null;
};

export default defineConfig(async ({ mode }) => {
  // Only apply the tagger in development mode and if it loaded successfully
  const tagger = mode === 'development' ? await loadTagger() : null;
  
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
      tagger,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
