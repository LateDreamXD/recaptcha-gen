import DomToImage from 'dom-to-image';

const file2base64 = (file: File) => new Promise<string>((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result as string);
	reader.onerror = error => reject(error);
});

const base642blob = (base64: string) => {
	const arr = base64.split(',');
	const mime = arr[0].match(/:(.*?);/)![1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type: mime});
}

const changeImgs = async(files: FileList, targets: HTMLImageElement[]) => {
	const imgs = await Promise.all(Array.from(files).map(file2base64));
	targets.forEach((imgEle, i) => {
		imgEle.src = imgs[i];
	});
}

// declare interface Options {w: number, h: number, mag: number | false | null };

const genImg = async(target: Node) => {

	return (await DomToImage.toPng(target));
}

const copyImg = async(target: HTMLDivElement, isMobile?: boolean) => {
	const applyPermissions = await navigator.permissions.query({name: 'clipboard-write' as PermissionName});
	if(applyPermissions.state === 'denied') {
		alert('在你同意之前, 无法复制图片到剪贴板.');
		return;
	}
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
export {file2base64, base642blob, changeImgs, genImg, copyImg, saveImg};
export default {changeImgs, copyImg, saveImg};