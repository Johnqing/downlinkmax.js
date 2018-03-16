/**
 * gprs => gprs: 2kb/s
 * r2g => regular 2g: 10kb/s
 * g2g => good 2g: 18kb/s
 * s3g => slow 3g: 9kb/s
 * r3g => regular 3g: 28kb/s
 * f3g => fast 3g: 35kb/s
 * r4g => regular 4g: 60kb/s
 * @returns {Promise}
 */

const list ={
	gprs: 2,
	s3g: 9,
	r2g: 10,
	g2g: 18,
	r3g: 28,
	f3g: 35,
	r4g: 60
};

//todo: 区分wifi和4g/3g
export default function downlinkmax() {
	return new Promise((resolve, reject) => {
		const starttime = +new Date();
		let img = new Image();
		img.onload = function () {
			const endtime = +new Date();
			img = img.onload = img.onerror = null;

			const size = 54.4 / (endtime - starttime) / 1000;
			let type = 'gprs';
			for(let key in list){
				if(size >= list[key]){
					type = key;
				}
			}

			resolve(type);
		};

		img.onerror = function () {
			img = img.onload = img.onerror = null;
			reject();
		};
		img.src = `https://ss1.bdstatic.com/kvoZeXSm1A5BphGlnYG/skin_zoom/881.jpg?v=${starttime}`;
	});
}
