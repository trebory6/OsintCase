import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

// Extra hosts to allow on the dev server (comma-separated), e.g. for reverse-proxy
// or Tailscale access. Set ALLOWED_HOSTS in your .env; do not hardcode hostnames here.
const extraHosts = (process.env.ALLOWED_HOSTS || '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

export default defineConfig({
  plugins: [react()],
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  server: {
    port: 5173,
    open: false,
    ...(extraHosts.length > 0 ? { allowedHosts: extraHosts } : {}),
  },
});
