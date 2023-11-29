/** @format */

import React from 'react';

import { RootDataType } from '../../page';
import { API_TOKEN, BACKEND_URL_API } from '@/config';
import Image from 'next/image';
import { getBase64, getBase64ForAllImg } from '@/utils/blurdDataUrl';
import Gallery from '@/components/Gallery';

export const revalidate = 86400;

export interface ImageType {
	url: string;
	alt: string;
	width: number;
	height: number;
	blurDataUrl: string | undefined;
}

export interface IPostData {
	zawartosc_posta: string;
	tytul: string;
	publishedAt: string;
	zdjecie_glowne: {
		data: {
			attributes: ImageType;
		};
	};
	galeria: { data: RootDataType<ImageType>[] };
}

const getPost = async (param: string): Promise<any> => {
	try {
		const res = await fetch(`${BACKEND_URL_API}/slugify/slugs/home-post/${param}?populate=*`, {
			headers: { Authorization: `Bearer ${API_TOKEN}` },
		});
		if (res.status === 404) {
			throw new Error('404');
		}
		if (res.status === 403 || res.status === 500 || res.status === 401) {
			throw new Error('Wykryto błąd po stronie serwera, spróbuj ponownie lub wróć do strony głównej.');
		}
		if (!res.ok) {
			throw new Error('Wykryto nieoczekiwany błąd, spróbuj ponownie lub wróć do strony głównej.');
		}
		const { data } = await res.json();
		return data;
	} catch (err: unknown) {
		console.error(err);
	}
};

const PostPage = async ({ params }: { params: any }) => {
	const data = await getPost(params.post[1]);
	console.log(params.post[1]);
	if ('errMsg' in data) {
		throw new Error(data.errMsg);
	}
	const { publishedAt, tytul, zawartosc_posta, zdjecie_glowne, galeria } = data.attributes;

	return (
		<main className='mb-32'>
			{tytul}
			<Gallery galeria={galeria} />
		</main>
	);
};

export default PostPage;
