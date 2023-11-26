/** @format */

import { IPostData } from '@/app/artykul/page';
import { getPlaiceholder } from 'plaiceholder';

export const getBase64 = async (image: string) => {
	try {
		const res = await fetch(image);
		if (!res.ok) {
			throw new Error(`Failed to fetch image ${res.status} ${res.statusText}`);
		}
		const buffer = await res.arrayBuffer();

		const { base64 } = await getPlaiceholder(Buffer.from(buffer));
		return base64;
	} catch (error) {
		console.error(error);
	}
};

export const getBase64ForAllImg = async (images: IPostData['galeria']): Promise<any> => {
	try {
		const photosWithBlur = [];

		for (const img of images.data) {
			const res = await getBase64(img.attributes.url);
			img.attributes.blurDataUrl = res;
			photosWithBlur.push(img);
		}
		console.log(photosWithBlur);
		return photosWithBlur;
	} catch (error) {
		console.error(error);
	}
};
