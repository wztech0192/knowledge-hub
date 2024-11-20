import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      VitePWA({
        strategies: 'generateSW',
        workbox: {
          maximumFileSizeToCacheInBytes: 7000000,
        },
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        injectRegister: 'auto',
        manifest: {
          short_name: 'KnowledgeHub',
          name: 'Knowledge Hub',
          icons: [
            {
              src: "images/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: 'any masakable'
            },
            {
              src: "images/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: 'any masakable'
            }
          ],
          start_url: '/',
          background_color: '#000000',
          theme_color: '#3367D6',
          display: 'standalone',
          scope: '/',
          orientation: 'portrait',
        },
      })
    ],
    base: mode === 'production' ? '/knowledge-hub/' : '/',
  };
});
