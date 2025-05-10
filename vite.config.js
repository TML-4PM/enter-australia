
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.jsx']
    },
    chunkSizeWarningLimit: 600 // Increase the warning limit to avoid the 500kB warning
  },
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react()
    // lovable-tagger is conditionally loaded in development mode only
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // This will help with any dependency resolution issues
  optimizeDeps: {
    exclude: ['lovable-tagger']
  }
});
