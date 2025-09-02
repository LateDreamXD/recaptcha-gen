<script setup lang="ts">
import { defineProps } from 'vue';
import actions from './apis';

defineProps({
	mainNode: HTMLDivElement,
	setPicNum: Function,
	setTargetText: Function,
	lowZoomMode: Function,
	switchCtrls: Function,
	switchTip: Function,
});

// @ts-ignore
const isMobile = ("userAgentData" in navigator)? navigator.userAgentData.mobile:
	matchMedia('(max-width: 768px)').matches;

</script>

<template>
	<div class="pico" id="actions">
		<div class="act-group">
			<span class="act-item">
				蓝色边框为预览区域, 不会出现在生成的图片中<br /><br />
				点击预览区域内文本以修改文本<br />
				点击预览区域内图片以更换图片<br />
				<span v-if="isMobile">上滑可调整其他内容</span>
			</span>
		</div>
		<div class="act-group" data-title="选项">
			<div class="group-content">
			<span v-if="false" class="act-item">
				<label for="text">要找出的目标名字:</label>
				<input @input="setTargetText!(($event.target as HTMLInputElement).value)" type="text" id="text" value="晚梦" />
			</span>
			<span class="act-item">
				<label for="pic-num" data-tooltip="会被开平方根, 所以可能出现实际数量少于设定值的情况">图片数量</label>
				<input @input="// @ts-ignore
				setPicNum!(($event.target.value || 9))" type="number" id="pic-num" ref="pic-num" value="9" placeholder="9" />
			</span>
			<span class="act-item">
				<input checked @click="lowZoomMode!(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="low-pixel-imgs-support" />
				<label for="low-pixel-imgs-support" data-tooltip="如果图片有缩放问题可以尝试开/关此选项">低缩放率模式</label>
			</span>
			<span class="act-item">
				<input checked @click="switchCtrls!(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="show-ctrl-panel" />
				<label for="show-ctrl-panel">显示<span data-tooltip="就是验证按钮旁边的刷新、音频验证和帮助按钮">控制按钮</span></label>
			</span>
			<span class="act-item">
				<input checked @click="switchTip!(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="show-tip" />
				<label for="show-tip">显示<span data-tooltip="就是「在没有新图片可以点按后，请点击“验证”。」这行字">提示信息</span></label>
			</span></div>
		</div>
		<div v-if="false" class="act-group" data-folded data-title="高级选项">
			<span class="act-item">
			</span>
		</div>
		<div class="btn-panel">
			<button @click.prevent="actions.copyImg(mainNode!, isMobile)" class="secondary" type="button" id="copy">复制图片到剪贴板</button>
			<button @click.prevent="actions.saveImg(mainNode!)" class="primary" type="button" id="save">保存图片到本地</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
* {
	--min-width: 400px;
}

#actions {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2rem;
}

.act-group {
	text-align: center;
	min-width: var(--min-width);
	margin-bottom: 1.6rem;
	&::before {
		content: attr(data-title);
		display: block;
		color: var(--pico-color);
		font-weight: 700;
		font-size: 1.2rem;
	}
}
.act-item {
	margin: 0.2rem;
	display: flex;
	justify-content: center;
	>input[type="number"] {
		height: 1.4rem;
		width: 4rem;
		padding: 0;
		padding-left: 0.2rem;
		// font-size: 0.8rem;
		margin-left: 0.6rem;
		margin-bottom: 0;
	}
	&>input[role="switch"] {
		margin-right: 0.6rem;
	}
}

.btn-panel {
	min-width: var(--min-width);
	display: flex;
	justify-content: space-between;
}
</style>