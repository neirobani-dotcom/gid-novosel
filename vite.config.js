import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // PHP-скрипты не кешируем — они должны всегда идти на сервер
        globIgnores: ['**/*.php', '**/*.log'],
        navigateFallbackDenylist: [/\.php$/],
      },
      manifest: {
        name: 'Гид Новосёла',
        short_name: 'Гид Новосёла',
        description: 'Маркетплейс подарков для новосёлов Красноярска',
        theme_color: '#0F0F0F',
        background_color: '#0F0F0F',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
