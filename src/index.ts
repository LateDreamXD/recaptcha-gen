import {createApp} from 'vue';
import App from './app/App.vue';
import './index.scss';

import browser from './libs/browser.min';

(async()=>{
	$app_info.env = import.meta.env.MODE;
	$app_info.debug = import.meta.env.DEV;
const info = await browser.getInfo();
$app_info.device = {
	type: info.device,
	os: `${info.system} ${info.systemVersion}`,
	platform: info.platform,
	arch: info.architecture,
	bit: info.bitness,
}
// @ts-ignore
const brands = navigator.userAgentData?.brands.filter((brand) => !/not.?a.?brand/.test(brand.brand.toLowerCase()));
$app_info.browser = {
	name: brands[brands.length - 1].brand,
	version: brands[brands.length - 1].version,
}
})();

createApp(App).mount('#app');
