import {createApp, ref} from 'vue';
import App from './app/App.vue';
import './index.scss';

const debugMode = ref<boolean>(import.meta.env.DEV);
const debug_ = {
	on: () => debugMode.value = true,
	off: () => debugMode.value = false,
	query: () => debugMode.value
}
declare global {
	interface Window {
		debug_: typeof debug_;
	}
}
window.debug_ = Object.freeze(debug_);

createApp(App).mount('#app');
