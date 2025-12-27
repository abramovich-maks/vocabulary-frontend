import react from '@vitejs/plugin-react';
import * as fs from 'node:fs';
import { defineConfig } from 'vite';

export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
