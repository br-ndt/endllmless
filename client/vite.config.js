import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

const api = process.env.OPENAI_API_KEY ? 'http://localhost:8080' : "https://endless.bitvox.me";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	server: {
		proxy: {
			'/wordcombine': api,
		}
	}
});
