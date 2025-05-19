
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
    // Using dynamic import for lovable-tagger to avoid ESM issues
    mode === 'development' && {
      name: 'dynamic-lovable-tagger',
      async configureServer(server) {
        if (mode === 'development') {
          try {
            // Dynamic import to handle ESM module
            const taggerModule = await import('lovable-tagger');
            if (taggerModule && taggerModule.componentTagger) {
              console.log('Successfully loaded lovable-tagger');
              // Apply the tagger through the Vite server
              server.middlewares.use((req, res, next) => {
                try {
                  const taggerMiddleware = taggerModule.componentTagger();
                  if (typeof taggerMiddleware === 'function') {
                    taggerMiddleware(req, res, next);
                  } else {
                    next();
                  }
                } catch (error) {
                  console.error('Error applying tagger middleware:', error);
                  next();
                }
              });
            }
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
