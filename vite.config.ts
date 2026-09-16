import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/futuristic/',
  plugins: [react(), tailwindcss()],
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
});
