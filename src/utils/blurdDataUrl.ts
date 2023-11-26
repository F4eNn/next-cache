/** @format */


import { getPlaiceholder } from 'plaiceholder';

import { IPostData } from '@/app/(default-page)/[...post]/page';

export const getBase64 = async (image: string) => {
	try {
		const buffer = await fetch(image).then(async res => Buffer.from(await res.arrayBuffer()));

		const { base64 } = await getPlaiceholder(Buffer.from(buffer));
		console.log(base64);
		return base64;
	} catch (error) {
		console.error(error);
	}
};

export const getBase64ForAllImg = async (images: IPostData['galeria']): Promise<IPostData['galeria']['data']> => {
	const base64Promises = images.data.map(img => getBase64(img.attributes.url));

	const base64Result = await Promise.all(base64Promises);

	const photosWithBlur = images.data.map((img, idx) => {
		img.attributes.blurDataUrl = base64Result[idx];
		return img;
	});
	return photosWithBlur;
};
