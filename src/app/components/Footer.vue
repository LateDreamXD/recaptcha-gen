<script setup lang="ts">
import {ref, useTemplateRef, version as vueVersion} from 'vue';

// debug info
const debugInfo = {
	name: __APP_NAME__,
	version: __APP_VERSION__,
	env: import.meta.env.MODE,
	host: location.hostname,
	// @ts-ignore
	device: ("userAgentData" in navigator)? navigator.userAgentData.platform: navigator.platform,
	vue: vueVersion
}

function getDebugMode() {
	return window.debug_.query();
}

const heart = useTemplateRef('heart');
const heartbeat = ref<number>(0);
function heartbeatEvent() {
	heartbeat.value++;
	console.log('heartbeat:', heartbeat.value);
	heart?.value?.classList.toggle('heartbeat');
	setTimeout(() => heart?.value?.classList.toggle('heartbeat'), 200);
	(heartbeat.value === 5) && window.debug_.on() && document.getElementById('title-version')?.classList.add('debug');
	setTimeout(() => heartbeat.value = 0, 5000);
}
</script>

<template>
	<div class="pico" id="footer">
	<div id="footer-main">
		<span class="ft-item">所有操作均在客户端执行, 请放心使用</span>
		<span class="ft-item">Made with <i id="heart" ref="heart" @click.prevent="heartbeatEvent">❤️</i> by <a href="https://about.latedream.cn/" target="_blank" rel="noopener">LateDream</a></span>
	</div>

	<details v-if="getDebugMode()" class="debug-info">
		<summary>🔧 Debug Info<span class="__details-angle">
			<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M472.064 272.448l-399.232 399.232c-22.08 22.08-22.08 57.792 0 79.872 22.016 22.016 57.792 22.08 79.872 0L512 392.256l359.296 359.296c22.016 22.016 57.792 22.08 79.872 0 22.08-22.08 22.016-57.792 0-79.872L551.936 272.448C529.856 250.432 494.144 250.432 472.064 272.448z"></path></svg>
		</span></summary>
		<pre><code v-text="JSON.stringify(debugInfo, null, 2)"></code></pre>
	</details>
	</div>
</template>

<style lang="scss" scoped>
.debug-info {
	margin-top: 1.2em;

	code {
		background-color: #232323;
		display: block;
		font-size: 70%;
		padding: 0.5rem;
		font-family: 'Fira Code', 'Lucida Console', 'Consolas', monospace;
	}
}
#footer {
	margin-top: 1.4rem;
}
#heart {
	font-style: normal;
	transition: font-size 0.2s ease-in-out;
	&.heartbeat {
		font-size: 1.4em;
	}
}
.ft-item {
	display: block;
	text-align: center;
}
</style>