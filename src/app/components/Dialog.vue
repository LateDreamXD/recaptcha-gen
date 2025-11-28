<script setup lang="ts">
const props = defineProps<{
	title?: string;
	closeable?: boolean;
	confirmText?: string;
	_close: () => boolean;
}>();
</script>

<template>
	<div class="dialog pico">
		<div class="dialog-container">
			<div class="dialog-header">
				<h2 class="dialog-title">{{ title ?? '提示' }}</h2>
			</div>

			<div class="dialog-content">
				<slot></slot>
			</div>

			<div class="dialog-footer">
				<button class="secondary" v-if="closeable !== false" @click="_close() && $emit('close')">取消</button>
				<button @click="_close() && $emit('confirm')">{{ confirmText ?? '确认' }}</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dialog {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(10px);
	display: flex;
	justify-content: center;
	align-items: center;

	.dialog-container {
		display: flex;
		flex-direction: column;
		min-width: 670px;
		min-height: 320px;
		max-width: 80%;
		max-height: 60%;
		border: 2px solid var(--pico-color);
		border-radius: 12px;

		transition: transform 0.2s ease-in-out;

		.dialog-header {
			padding: 16px;
			background-color: var(--pico-primary-background);

			border-radius: 12px 12px 0 0;

			.dialog-title {
				margin: 0;
			}
		}

		.dialog-content {
			flex: 1;
			padding: 16px;
			font-size: 1em;
			overflow: auto;

			background-color: var(--pico-background-color);
		}

		.dialog-footer {
			display: inline-flex;
			justify-content: flex-end;

			padding: 16px;
			background-color: var(--pico-secondary);

			border-radius: 0 0 12px 12px;

			button {
				margin-left: 1em;
				transition: transform 0.2s ease-in-out;
				&:hover {
					transform: scale(1.1);
				}
			}
		}

		&:hover {
			transform: scale(1.02);
		}
	}
}
</style>