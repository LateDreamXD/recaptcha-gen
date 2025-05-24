<script setup lang="ts">
import {ref} from 'vue';
const debugMode = ref<boolean>(import.meta.env.DEV);
window.debugMode = Object.freeze({
	on:() => debugMode.value = true,
	off:() => debugMode.value = false,
	query:() => debugMode.value
})
// debug info
const appName = __VUE_APP_NAME__;
const appVersion = __VUE_APP_VERSION__;
const appEnv = import.meta.env.MODE;
const viteVersion = __VITE_VERSION__;
const vueVersion = __VUE_VER__;
const nodeVersion = __NODE_VER__;
const v8Version = __V8_VER__;
const host = location.hostname;
const devicePlatfrom = navigator.platform;
</script>

<template>
	<div class="pico" id="footer">
	<div id="footer-main">
		<span class="ft-item">所有操作均在客户端执行, 请放心使用</span>
		<span class="ft-item">Made with ❤️ by <a href="https://about.latedream.cn/" target="_blank" rel="noopener">LateDream</a></span>
	</div>

	<details v-if="debugMode" class="debug-info">
		<summary>🔧 Debug Info<span class="__details-angle">
			<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M472.064 272.448l-399.232 399.232c-22.08 22.08-22.08 57.792 0 79.872 22.016 22.016 57.792 22.08 79.872 0L512 392.256l359.296 359.296c22.016 22.016 57.792 22.08 79.872 0 22.08-22.08 22.016-57.792 0-79.872L551.936 272.448C529.856 250.432 494.144 250.432 472.064 272.448z"></path></svg>
		</span></summary>
		<span>appName: {{ appName }}</span>
		<span>appVersion: {{ appVersion }}</span>
		<span>appEnv: {{ appEnv }}</span>
		<span>viteVersion: {{ viteVersion }}</span>
		<span>vueVersion: {{ vueVersion }}</span>
		<span>nodeVersion: {{ nodeVersion }}</span>
		<span>v8Version: {{ v8Version }}</span>
		<span>host: {{ host }}</span>
		<span>devicePlatfrom: {{ devicePlatfrom }}</span>
	</details>
	</div>
</template>

<style scoped>
.debug-info {
	margin-top: 1.2em;
}
.debug-info>* {
	display: block;
	font-size: 70%;
}
#footer {
	margin-top: 1.4rem;
}
.ft-item {
	display: block;
	text-align: center;
}
</style>