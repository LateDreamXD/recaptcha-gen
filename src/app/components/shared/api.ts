import { defineAsyncComponent, h, render, type VNode } from 'vue';
import { domToPng } from 'modern-screenshot';
import { file2base64, base642blob } from '@libs/file-helper';


const changeImgs = async(files: FileList, targets: HTMLImageElement[]) => {
	const imgs = await Promise.all(Array.from(files).map(file2base64));
	targets.forEach((imgEle, i) => {
		imgEle.src = imgs[i];
	});
}

// declare interface Options {w: number, h: number, mag: number | false | null };

const genImg = async(target: Node) => {

	return (await domToPng(target));
}

const copyImg = async(target: HTMLDivElement, isMobile?: boolean) => {
	const img = base642blob(await genImg(target));
	if(isMobile && !confirm('检测到你的设备为移动端, 可能不支持将图片复制到剪贴板.\n尽管如此, 你是否仍要复制图片到剪贴板?'))
		return;
	await navigator.clipboard.write([new ClipboardItem({[img.type]: img})])
		  .then(() => alert('图片已复制到剪贴板!'))
		  .catch((e: Error) => alert(`复制图片到剪贴板失败: ${e.message}`));
}

const saveImg = async(target: HTMLDivElement) => {
	const a = document.createElement('a');
	a.href = await genImg(target);
	a.download = 'captcha.png';
	a.click();
	a.remove();
}

const openDialog = (content?: string | VNode, options?: {
	title?: string,
	closeable?: boolean,
	confirmText?: string
	cancelCallback?: () => void
	confirmCallback?: () => void
}) => {
	const node = document.createElement('div');
	node.classList.add('dialog-node');
	const Dialog = defineAsyncComponent(() => import('../Dialog.vue'));
	const dialog = h(Dialog, {
		title: options?.title,
		closeable: options?.closeable,
		confirmText: options?.confirmText,
		_close: () => (node.remove(), !0),
		onCancel: options?.cancelCallback,
		onConfirm: options?.confirmCallback,
	}, { default: () => content });
	render(dialog, node);
	document.body.appendChild(node);
	return dialog;
}

export {file2base64, base642blob, changeImgs, genImg, copyImg, saveImg, openDialog};
export default {changeImgs, copyImg, saveImg};