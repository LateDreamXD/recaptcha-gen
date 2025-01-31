<script setup lang="ts">
import {ref} from 'vue';
import Preview from './views/Preview.vue';
import actions from './libs/actions';

const previewRef = ref<InstanceType<typeof Preview>>();
</script>

<template>
	<div class="title">reCAPTCHA梗图生成器</div>

	<Preview ref="previewRef" />

	<div class="actions">
		<div class="act-group" data-title="一般选项">
			<span class="act-item">
				<label for="text">要找出的目标名字:</label>
				<input @input="(e: Event) => previewRef!.targetText = (e.target as HTMLInputElement).value" type="text" id="text" value="晚梦" />
			</span>
			<span class="act-item">
				<label for="images">提供的图片(需要9张):</label>
				<input @change="(e: Event) => actions.changeImgs((e.target as HTMLInputElement).files!, previewRef!.imgEles!)" type="file" id="images" accept="image/*" multiple />
			</span>
			<span class="act-item">
				<input checked @click="(e: Event) => previewRef!.lowPixelMode((e.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="low-pixel-imgs-support" />
				<label for="low-pixel-imgs-support">低像素图片支持</label>
			</span>
		</div>
		<!-- <div class="act-group" data-folded data-title="高级选项">
			<span class="act-item">
			</span>
		</div> -->
		<div class="btn-panel">
			<button @click.prevent="previewRef!.CopyImg()" type="button" id="copy">复制图片到剪贴板</button>
			<button @click.prevent="previewRef!.SaveImg()" type="button" id="save">保存图片到本地</button>
		</div>
	</div>

	<div class="footer" style="margin-top: 1rem;">
		<span class="ft-item">©2025 晚梦. 以 <a style="color: deeppink;" href="http://mozilla.org/MPL/2.0/">MPL2.0</a> 许可开源.</span>
		<span class="ft-item"><a style="color: deeppink;" href="https://github.com/LateDreamXD/recaptcha-gen">View on GitHub</a></span>
	</div>
</template>

<style lang="scss" scoped>
* {
	--font-size: 1.4rem;
	--min-width: 400px;
}

.actions {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2rem;
	font-size: var(--font-size);
	& > .act-group {
		min-width: var(--min-width);
		margin-bottom: 1.6rem;
		& > .act-item {
			margin: 0.2rem;
			display: block;
		}
	}
	& input:not([type="checkbox"]) {
		padding: 0.4rem;
		width: 100%;
		border: 2px solid var(--border-color);
		border-radius: 0.4rem;
		display: block;
		font-size: var(--font-size);
		color: var(--color);
		background-color: var(--bg-color);
		transition: border-color 0.6s ease;
		&:hover {
			border-color: var(--color);
		}
	}
	& input[type="checkbox"] {
		height: 1.2rem;
		width: 2rem;
	}
	& button {
		cursor: pointer;
		padding: 0.4rem;
		font-size: var(--font-size);
		border: 2px solid var(--color);
		border-radius: 0.4rem;
		color: var(--color);
		background-color: var(--border-color);
		transition: border-color 0.6s ease;
		&:hover {
			border-color: transparent;
		}
	}
}

.btn-panel {
	min-width: var(--min-width);
	display: flex;
	justify-content: space-between;
}

.title {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 1rem;
	text-align: center;
}

.ft-item {
	display: block;
	font-size: 1.2rem;
	text-align: center;
}
</style>