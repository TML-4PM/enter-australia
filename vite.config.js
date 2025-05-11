
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.jsx']
    },
    chunkSizeWarningLimit: 600, // Increased warning limit to avoid the 500kB warning
    sourcemap: true, // Enable sourcemaps for better debugging
    minify: 'terser', // Use terser for better minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    // Note: componentTagger plugin removed due to ESM compatibility issues
    // Will be re-enabled when compatibility issues are resolved
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
}));
