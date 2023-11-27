/** @format */

import React from 'react';

import { RootDataType } from '../page';
import { API_TOKEN, BACKEND_URL_API } from '@/config';
import Image from 'next/image';
import { getBase64, getBase64ForAllImg } from '@/utils/blurdDataUrl';

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
			next: { revalidate: 0 },
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

const PostPage = async () => {
	const data = await getPost('czwarty-tytul');

	if ('errMsg' in data) {
		throw new Error(data.errMsg);
	}
	const { publishedAt, tytul, zawartosc_posta, zdjecie_glowne, galeria } = data.attributes;

	const blurderMainPicutre = await getBase64(zdjecie_glowne.data.attributes.url);
	const galleryWithBluredUrl = await getBase64ForAllImg(galeria);
	return (
		<main className='mb-32'>
			{tytul}
			<Image
				src={galeria.data[0].attributes.url}
				width={400}
				height={500}
				className='h-56 w-56 object-cover'
				alt=''
			/>
			<Image
				src={galeria.data[1].attributes.url}
				width={400}
				height={500}
				className='h-56 w-56 object-cover'
				alt=''
			/>
			<Image
				src={galeria.data[2].attributes.url}
				width={400}
				height={500}
				className='h-56 w-56 object-cover'
				alt=''
			/>
			<Image
				src={galeria.data[3].attributes.url}
				width={400}
				height={500}
				className='h-56 w-56 object-cover'
				alt=''
			/>
			<Image
				src={galeria.data[4].attributes.url}
				width={400}
				height={500}
				className='h-56 w-56 object-cover'
				alt=''
			/>
			<Image
				src={galeria.data[5].attributes.url}
				width={400}
				height={500}
				className='h-56 w-56 object-cover'
				alt=''
			/>
		</main>
	);
};

export default PostPage;
