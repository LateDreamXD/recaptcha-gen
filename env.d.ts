declare const $app_info: {
	name: string;
	version: string;
	libs: Record<string, string>;
	env: string;
	debug: boolean;
	device: {
		type: string,
		os: string,
		platform: string,
		arch: string,
		bit?: number
	};
	browser: {
		name: string,
		version: string,
	}
}