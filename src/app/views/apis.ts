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

const copyImg = async(target: HTMLDivElement) => {
	const applyPermissions = await navigator.permissions.query({name: 'clipboard-write' as PermissionName});
	if(applyPermissions.state === 'denied') {
		alert('Please allow the permission to copy image to clipboard.');
		return;
	}
	const img = base642blob(await genImg(target));
	await navigator.clipboard.write([new ClipboardItem({[img.type]: img})])
		  .then(() => alert('Image copied to clipboard.'))
		  .catch((e: Error) => alert(`Failed to copy image to clipboard: ${e.message}`));
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