import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import _package_ from './package.json';

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [vue()],
	base: './',
	define: {
		__VITE_VERSION__: JSON.stringify(_package_.devDependencies.vite.replace(/[^\d.]/g, '')),
		__VUE_VER__: JSON.stringify(_package_.dependencies.vue.replace(/[^\d.]/g, '')),
		__VUE_APP_NAME__: JSON.stringify(process.env.npm_package_name),
		__VUE_APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__NODE_VER__: JSON.stringify(process.version),
		__V8_VER__: JSON.stringify(process.versions.v8),
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
});