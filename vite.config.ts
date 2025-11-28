import type { UserConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/

export default <UserConfig>{
	plugins: [vue()],
	base: './',
	define: {
		__APP_NAME__: JSON.stringify(process.env.npm_package_name),
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@libs': path.resolve(__dirname, 'src/libs'),
		}
	},
	build: {
		modulePreload: {
			polyfill: true
		},
		rollupOptions: {
			output: {
				manualChunks: {
					'libs/vue': ['vue'],
					'libs/modern-screenshot': ['modern-screenshot'],
					'libs/file-helper': ['@/libs/file-helper'],
				}
			}
		}
	}
};