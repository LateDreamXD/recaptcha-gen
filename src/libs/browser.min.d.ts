export const getInfo: ()=>Promise<{
	system: string;
	systemVersion: string;
	platform: string;
	architecture: string;
	bitness: number;
	devicePixelRatio: number;
	deviceMemory: number;
	device: string;
}>