import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/analytics'],
  },
});
