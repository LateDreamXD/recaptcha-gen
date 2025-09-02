import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/

export default <UserConfig>{
	plugins: [vue()],
	base: './',
	define: {
		__APP_NAME__: JSON.stringify(process.env.npm_package_name),
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
	},
	build: {
		modulePreload: {
			polyfill: true
		},
		rollupOptions: {
			output: {
				manualChunks: {
					'vue': ['vue'],
					'dom-to-image': ['dom-to-image']
				}
			}
		}
	}
};