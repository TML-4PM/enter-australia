
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
    // We'll dynamically import the tagger only when needed to avoid ESM issues
    mode === 'development' && {
      name: 'dynamically-import-tagger',
      async buildStart() {
        if (mode === 'development') {
          try {
            // This dynamic import is ESM-compatible
            const module = await import('lovable-tagger');
            // Set up any needed configuration here
            console.log('Lovable tagger loaded successfully');
          } catch (error) {
            console.warn('Could not load lovable-tagger:', error.message);
          }
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    devSourcemap: true,
  },
}));
