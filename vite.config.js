
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.jsx']
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
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
    mode === 'development' && (async () => {
      const { componentTagger } = await import('lovable-tagger');
      return componentTagger();
    })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom']
  },
  css: {
    devSourcemap: false,
  },
}));
