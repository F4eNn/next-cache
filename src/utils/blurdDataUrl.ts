/** @format */

import { getPlaiceholder } from 'plaiceholder';

import { IPostData } from '@/app/(default-page)/[...post]/page';

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
		// const base64Promises = images.data.map(img => getBase64(img.attributes.url));
        const base64Promises =  images.data.map(async (img, idx) => {
            const res = await getBase64(img.attributes.url)
           return img.attributes.blurDataUrl = res
        });
		// const base64Result = await Promise.all(base64Promises);
        // console.log(base64Result);
		// const photosWithBlur = images.data.map((img, idx) => {
		// 	img.attributes.blurDataUrl = base64Result[idx];
		// 	return img;
		// });
        const photosWithBlur = await Promise.all(base64Promises)
        console.log(photosWithBlur);
		return photosWithBlur;
	} catch (error) {
		console.error(error);
	}
};
