import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto'
      }),
    ],
    base: mode === 'production' ? '/knowledge-hub' : '/',
  };
});
