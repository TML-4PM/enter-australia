
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
  // Disable component tagger in production to avoid conflicts
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
      emptyOutDir: true,
      commonjsOptions: {
        include: [/node_modules/],
        extensions: ['.js', '.jsx']
      }
    },
    server: {
      host: "::",
      port: 8080
    },
    plugins: [
      react(),
      // Only include the tagger in dev mode
      mode === 'development' ? componentTaggerPlugin : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // This will help with any dependency resolution issues
    optimizeDeps: {
      exclude: mode === 'production' ? ['lovable-tagger'] : []
    }
  };
});
