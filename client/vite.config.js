import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	server: {
		proxy: {
			'/wordcombine': process.env.OPENAI_API_KEY ? 'http://localhost:8080' : "https://endless.bitvox.me",
		}
	}
});
