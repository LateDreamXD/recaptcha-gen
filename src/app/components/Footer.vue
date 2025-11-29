<script setup lang="ts">
import {ref} from 'vue';
import { activeDebug } from './store';

const heartbeat = ref<number>(0);
function heartbeatEvent(evt: EventTarget | null) {
	// @ts-ignore
	evt?.classList.toggle('heartbeat'); setTimeout(() => evt?.classList.toggle('heartbeat'), 200);
	if(heartbeat.value >= 5) return;
	heartbeat.value++;
	(heartbeat.value === 5) && activeDebug() && document.getElementById('title-version')?.classList.add('debug');
	setTimeout(() => heartbeat.value = 0, 5000);
}
</script>

<template>
	<div class="pico" id="footer">
		<div id="footer-main">
			<span class="ft-item">所有操作均在客户端执行, 请放心使用</span>
			<span class="ft-item">Made with <i id="heart" ref="heart" @click.prevent="heartbeatEvent($event.target)">❤️</i> by <a href="https://about.latedream.cn/" target="_blank" rel="noopener">LateDream</a></span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
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