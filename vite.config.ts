import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslintPlugin()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
