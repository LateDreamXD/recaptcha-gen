<script setup lang="ts">
import { defineProps, ref } from 'vue';
import actions from './apis';

const limitedMode = ref(true);

defineProps({
	mainNode: HTMLDivElement,
	setPicNum: Function,
	setTargetText: Function,
	lowZoomMode: Function,
	switchCtrls: Function,
	switchTip: Function,
	SPM: {
		get: Function,
		set: Function,
		setFillMode: Function,
	}
});

// @ts-ignore
const isMobile = ("userAgentData" in navigator)? navigator.userAgentData.mobile:
	matchMedia('(max-width: 768px)').matches;

const getDebugMode = () => window.debug_.query();

function superMobileMode(target: HTMLInputElement) {
	if(isMobile) {
		document.body.classList.toggle('super-mobile-mode');
	} else {
		target.checked = false;
		target.disabled = true;
		const label = target.parentElement!.querySelector('label')!;
		label.style.color = 'gray', label.parentElement!.style.cursor = 'not-allowed';
		label.textContent = '此功能仅限移动设备使用';
	}
}
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
					多图模式 <input class="picm-switch" @click="SPM.set(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" style="margin-left: 0.6rem;" /> 单图模式
				</span>
				<span class="act-item">
					<label for="pic-num" :data-tooltip="`会被开平方根, 所以可能出现实际数量少于设定值的情况. 较多的图片数量更推荐使用桌面设备. (${limitedMode? '为了你的设备考虑, 最高 500': '无限制? 你疯了吗?'})`"
					:style="{'border-color': limitedMode? 'initial': 'red'}"
					>图{{ SPM.get()? '块': '片' }}数量</label>
					<input @input="// @ts-ignore
					setPicNum!(Math.min(limitedMode? 500: Infinity, Math.max(+$event.target.value || 9, 9)))" type="number" id="pic-num" ref="pic-num" value="9" max="500" placeholder="9" />
				</span>
				<span class="act-item" v-if="SPM.get()">
					<label for="single-pic-fill-mode" style="display: contents;">图片填充模式</label>
					<select id="single-pic-fill-mode" @change="SPM.setFillMode(($event.target as HTMLSelectElement).value)">
						<option value="contain">包含</option>
						<option value="fill" selected>填充</option>
						<option value="cover">覆盖</option>
						<option value="none">无</option>
						<option value="scale-down">缩小</option>
					</select>
				</span>
				<span class="act-item" v-else>
					<input checked @click="lowZoomMode!(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="low-pixel-imgs-support" />
					<label for="low-pixel-imgs-support" data-tooltip="如果图片有缩放问题可以尝试开/关此选项">低缩放率模式</label>
				</span>
				<span class="act-item">
					<input checked @click="switchCtrls!(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="show-ctrl-panel" />
					<label for="show-ctrl-panel">显示<span data-tooltip="就是验证按钮旁边的刷新、音频验证和帮助按钮">控制按钮</span></label>
				</span>
				<span class="act-item" v-if="!SPM.get()">
					<input checked @click="switchTip!(($event.target as HTMLInputElement).checked)" type="checkbox" role="switch" id="show-tip" />
					<label for="show-tip">显示<span data-tooltip="就是「在没有新图片可以点按后，请点击“验证”。」这行字">提示信息</span></label>
				</span>
			</div>
		</div>
		<div v-if="false" class="act-group" data-folded data-title="高级选项">
			<span class="act-item">
			</span>
		</div>
		<div v-if="getDebugMode()" class="act-group" data-title="Debug Funcs">
			<span class="act-item">
				<input @click="superMobileMode($event.target as HTMLInputElement)" type="checkbox" role="switch" id="super-mobile-mode" />
				<label for="super-mobile-mode" data-tooltip="unlock zoom on mobile devices">super mobile mode</label>
			</span>
			<span class="act-item">
				<input class="danger-switch" @click="limitedMode = !limitedMode" type="checkbox" role="switch" id="limited-mode" />
				<label for="limited-mode" data-tooltip="this may destroy your device!" style="color: red;">remove limit of pic num</label>
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
	align-items: center;
	justify-content: center;
	>input:not([type="checkbox"]):not([type="radio"]), >select {
		height: 1.4rem;
		width: 4rem;
		padding: 0;
		padding-left: 0.2rem;
		// font-size: 0.8rem;
		margin-left: 0.6rem;
		margin-bottom: 0;
		background-position: bottom right;
	}
	>input[role="switch"] {
		margin-right: 0.6rem;

		&.danger-switch {
			&+label::before {
				--pico-tooltip-color: red;
			}
			&:checked {
				--pico-background-color: red;
				--pico-border-color: var(--pico-form-element-invalid-border-color);
			}
		}
	}
}

.btn-panel {
	min-width: var(--min-width);
	display: flex;
	justify-content: space-between;
}

.picm-switch {
	// height: 2.5em !important;
	// line-height: 2.5em !important;
	// width: 4.5em !important;
	&:not(:checked) {
		--pico-border-color: #6f70b3 !important;
		--pico-background-color: #6f70b3 !important;
	}
	&::before {
		background-size: 0.5em;
		background-position: center;
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>image-multiple-outline</title><path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" /></svg>');
	}
	&:checked::before {
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>image-outline</title><path d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" /></svg>');
	}
}
</style>