<script setup lang="ts">
import {useTemplateRef, ref, defineExpose} from 'vue';
import {file2base64} from './apis';

const mainRef = useTemplateRef<HTMLDivElement>('main');
const targetText = ref<string>('晚梦');
const showTip = ref<boolean>(true);
const showCtrls = ref<boolean>(false);

const lowPixelMode = (value: boolean) => {
	mainRef.value!.classList.toggle('low-pixel-mode', value);
}

const setImg = (target: HTMLImageElement) => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.click();
	input.addEventListener('change', async() => {
		const files = input.files;
		if(!!files && files.length > 0)
			target.src = await file2base64(files![0]);
		input.remove();
	});
}

defineExpose({
	targetText,
	mainNode: mainRef,
	lowPixelMode,
	showTip,
	showCtrls
});
</script>

<template>
	<div class="low-pixel-mode" ref="main" id="main" style="">
		<div id="rc-imageselect" aria-modal="true" role="dialog">
			<div class="rc-imageselect-response-field"></div><span class="rc-imageselect-tabloop-begin"
				tabindex="0"></span>
			<div class="rc-imageselect-payload">
				<div class="rc-imageselect-instructions">
					<div class="rc-imageselect-desc-wrapper">
						<div class="rc-imageselect-desc-no-canonical" style="width: 352px; font-size: 12px;">
							请选择包含<strong :textContent="targetText" style="font-size: 28px;"></strong>的所有图片。<span
							v-if="showTip" style="font-size: 14px;">在没有新图片可以点按后，请点击“验证”。</span></div>
					</div>
					<div class="rc-imageselect-progress"></div>
				</div>
				<div class="rc-imageselect-challenge">
					<div id="rc-imageselect-target" class="rc-imageselect-target" dir="ltr" role="presentation"
						aria-hidden="true">
						<table class="rc-imageselect-table-33">
							<tbody>
								<tr>
									<td role="button" tabindex="4" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="top:0%;">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
									<td role="button" tabindex="5" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="top:0%;">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
									<td role="button" tabindex="6" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="top:0%;">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
								</tr>
								<tr>
									<td role="button" tabindex="7" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
									<td role="button" tabindex="8" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
									<td role="button" tabindex="9" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
								</tr>
								<tr>
									<td role="button" tabindex="10" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
									<td role="button" tabindex="11" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
									<td role="button" tabindex="12" class="rc-imageselect-tile" aria-label="图片验证">
										<div class="rc-image-tile-target">
											<div class="rc-image-tile-wrapper" style="width: 126px; height: 126px">
												<img @click="setImg(($event.target as HTMLImageElement))" class="rc-image-tile-33"
													src="https://i.latedream.us.kg/static/xs_avatar_4k_.jpg"
													alt="" style="">
												<div class="rc-image-tile-overlay"></div>
											</div>
											<div class="rc-imageselect-checkbox"></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="rc-footer">
				<div class="rc-separator"></div>
				<div class="rc-controls">
					<div class="primary-controls">
						<div v-if="showCtrls" class="rc-buttons">
							<div class="button-holder reload-button-holder"><button
									class="rc-button goog-inline-block rc-button-reload" title="换一个新的验证码" value=""
									id="recaptcha-reload-button" tabindex="3"></button></div>
							<div class="button-holder audio-button-holder"><button
									class="rc-button goog-inline-block rc-button-audio" title="改用音频验证" value=""
									id="recaptcha-audio-button" tabindex="1"></button></div>
							<div class="button-holder liveness-button-holder" style="display: none;"></div>
							<div class="button-holder help-button-holder"><button
									class="rc-button goog-inline-block rc-button-help" title="帮助" value=""
									id="recaptcha-help-button" tabindex="2"></button></div>
							<div class="button-holder undo-button-holder"><button
									class="rc-button goog-inline-block rc-button-undo" title="撤消" value=""
									id="recaptcha-undo-button" tabindex="0" style="display: none;"></button></div>
						</div>
						<div class="verify-button-holder"><button class="rc-button-default goog-inline-block"
								title="" value="" id="recaptcha-verify-button" tabindex="0">验证</button></div>
					</div>
					<div class="rc-challenge-help" style="display:none" tabindex="0"></div>
				</div>
			</div><span class="rc-imageselect-tabloop-end" tabindex="0"></span>
		</div>
	</div>
</template>

<style scoped>
@import url('../../styles__ltr.css');
* {
	/** prevent picocss override */
	--pico-font-family: initial;
	line-height: initial;
	box-sizing: initial;
}
.low-pixel-mode .rc-image-tile-33 {
	width: 100%;
	height: 100%;
}
</style>