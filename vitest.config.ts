import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['**/tests/**/*.test.ts'],
			provider: 'c8',
			reporter: [ 'text', 'json', 'html' ],
		},
	},
});
