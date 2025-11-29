<script setup lang="ts">
import { ref, reactive, h, computed } from 'vue';
import actions, { openDialog } from '@libs/shared-api';
import store from './store';

const unlimitedMode = ref(!1);
const lockXY = ref(false);

const props = defineProps<{
	mainNode: HTMLDivElement,
	// setPicNum: (value: number) => void,
	setPicNum2: (value: {x: number, y: number}) => void,
	// setTargetText: Function,
	lowZoomMode: (value: boolean) => void,
	switchCtrls: (value: boolean) => void,
	switchTip: (value: boolean) => void,
	SPM: {
		get: () => boolean,
		set: (value: boolean) => void,
		setFillMode: (value: PicFillMode) => void,
		getFillMode: () => PicFillMode,
	}
}>();

const options = reactive({
	picNum2: {
		x: 3,
		y: 3,
	},
	singlePicMode: props.SPM.get(),
	singlePicFillMode: props.SPM.getFillMode(),
	showCtrlPanel: true,
	showTip: true,
	lowZoomMode: !0,
});

// @ts-ignore
const isMobile = ("userAgentData" in navigator)? navigator.userAgentData.mobile:
	matchMedia('(max-width: 768px)').matches;

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

function copyDebugInfo() {
	navigator.clipboard.writeText(JSON.stringify(store.debugInfo, null, 2)).then(() => {
		openDialog('复制成功', {closeable: !1});
	}).catch((e: Error) => {
		openDialog(h('div', {}, [
			h('p', {}, '复制失败!'),
			h('p', {}, e.message)
		]), {closeable: !1});
	});
}

function updatePicNum2(isX = !1) {
	if(!unlimitedMode.value && (options.picNum2.x > 50 || options.picNum2.y > 50))
		return;
	if(isX && lockXY.value)
		options.picNum2.y = options.picNum2.x;
	props.setPicNum2({x: options.picNum2.x, y: options.picNum2.y});
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
				<span class="act-item">
					多图模式 <input class="picm-switch" @change="SPM.set(options.singlePicMode)" v-model="options.singlePicMode" type="checkbox" role="switch" style="margin-left: 0.6rem;" /> 单图模式
				</span>
				<span class="act-item">
					<label for="pic-num"
						:style="{'border-color': unlimitedMode? 'initial': 'red'}"
					>图{{ SPM.get()? '块': '片' }}数量</label>
					<input style="margin-right: 0.2rem;" @input="updatePicNum2(true)" v-model="options.picNum2.x" type="number" id="pic-num-x" ref="pic-num" value="3" :max="unlimitedMode? Infinity: 50" placeholder="3" />
					x
					<input style="margin-left: 0.2rem;" @input="updatePicNum2()" v-model="options.picNum2.y" :disabled="lockXY" type="number" id="pic-num-y" ref="pic-num" value="3" :max="unlimitedMode? Infinity: 50" placeholder="3" />
				</span>
				<span class="act-item" v-if="options.singlePicMode">
					<label for="single-pic-fill-mode" style="display: contents;">图片填充模式</label>
					<select id="single-pic-fill-mode" @change="SPM.setFillMode(options.singlePicFillMode)" v-model="options.singlePicFillMode">
						<option value="contain">包含</option>
						<option value="fill" selected>*填充</option>
						<option value="cover">覆盖</option>
						<option value="none">无</option>
						<option value="scale-down">缩小</option>
					</select>
				</span>
				<span class="act-item" v-else>
					<input @change="lowZoomMode(options.lowZoomMode)" v-model="options.lowZoomMode" :checked="options.lowZoomMode" type="checkbox" role="switch" id="low-pixel-imgs-support" />
					<label for="low-pixel-imgs-support" data-tooltip="如果图片有缩放问题可以尝试开/关此选项">低缩放率模式</label>
				</span>
				<span class="act-item">
					<input @change="switchCtrls(options.showCtrlPanel)" v-model="options.showCtrlPanel" :checked="options.showCtrlPanel" type="checkbox" role="switch" id="show-ctrl-panel" />
					<label for="show-ctrl-panel">显示<span data-tooltip="就是验证按钮旁边的刷新、音频验证和帮助按钮">控制按钮</span></label>
				</span>
				<span class="act-item" v-if="!options.singlePicMode">
					<input @change="switchTip(options.showTip)" v-model="options.showTip" :checked="options.showTip" type="checkbox" role="switch" id="show-tip" />
					<label for="show-tip">显示<span data-tooltip="就是「在没有新图片可以点按后，请点击“验证”。」这行字">提示信息</span></label>
				</span>
			</div>
		</div>
		<div v-if="false" class="act-group" data-folded data-title="高级选项">
			<span class="act-item">
			</span>
		</div>
		<div v-if="store.debugInfo.debug" class="act-group" data-title="调试选项">
			<span class="act-item">
				<input @click="superMobileMode($event.target as HTMLInputElement)" type="checkbox" role="switch" id="super-mobile-mode" />
				<label for="super-mobile-mode" data-tooltip="在移动设备解除缩放限制">移动设备增强</label>
			</span>
			<span class="act-item">
				<input class="danger-switch" v-model="unlimitedMode" type="checkbox" role="switch" id="limited-mode" />
				<label for="limited-mode" data-tooltip="这可能导致性能问题, 请谨慎使用" style="color: red;">移除数量限制</label>
			</span>
			<span class="act-item">
				<button class="small" @click.prevent="openDialog(
					h('pre', {}, h('code', {style: {
						'font-size': '16px',
						'font-family': 'Fira Code, Lucida Console, Consolas, monospace'
					}}, JSON.stringify(store.debugInfo, null, 2))),
					{title: '调试信息', confirmText: '复制', confirmCallback: copyDebugInfo}
				)">调试信息</button>
			</span>
		</div>
		<div class="btn-panel">
			<button @click.prevent="actions.copyImg(mainNode, isMobile)" class="secondary" type="button" id="copy">复制图片到剪贴板</button>
			<button @click.prevent="actions.saveImg(mainNode)" class="primary" type="button" id="save">保存图片到本地</button>
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
	>button.small {
		margin-top: 0.4rem;
		padding: 0.2rem 0.4rem;
		font-size: 0.8rem;
	}
	>input:not([type="checkbox"]):not([type="radio"]), &>select {
		    height: 1.4rem;
			width: 4rem;
			padding: 0;
			padding-inline: 0 !important;
			padding-left: 0.2rem !important;
			margin-left: 0.6rem;
			margin-bottom: 0;
			background-position: bottom right !important;
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