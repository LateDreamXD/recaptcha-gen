<script setup lang="ts">
import {ref, onMounted, defineExpose} from 'vue';
import {copyImg, saveImg} from '../libs/actions';

const main = ref<HTMLDivElement>(document.querySelector('#main')!);
const imgEles = ref<HTMLImageElement[]>([]);
const targetText = ref('晚梦');

const lowPixelMode = (value: boolean) => {
	main.value.classList.toggle('low-pixel-mode', value);
}

onMounted(() => {
	imgEles.value = Array.from(main.value.querySelectorAll('.rc-image-tile-33'));
});

defineExpose({
	targetText,
	imgEles,
	lowPixelMode,
	CopyImg() {copyImg(main.value)},
	SaveImg() {saveImg(main.value)}
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
								style="font-size: 14px;">在没有新图片可以点按后，请点击“验证”。</span></div>
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
												<img class="rc-image-tile-33"
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
						<div class="rc-buttons" style="display: none;">
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
.low-pixel-mode .rc-image-tile-33 {
	width: 100%;
	height: 100%;
}
</style>