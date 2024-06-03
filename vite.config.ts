import path from 'path';

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
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/*'),
			'@assets': path.resolve(__dirname, './src/assets'),
			common: path.resolve(__dirname, './src/common/'),
		},
	},
});
