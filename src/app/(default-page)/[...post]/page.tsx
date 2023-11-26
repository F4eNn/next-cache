/** @format */

import React from 'react';

import { RootDataType } from '../page';
import { API_TOKEN, BACKEND_URL_API } from '@/config';
import { error } from 'console';
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
		const res = await fetch(
			`${BACKEND_URL_API}/slugify/slugs/home-post/${param}?populate[zdjecie_glowne][fields][0]=url&populate[zdjecie_glowne][fields][1]=width&populate[zdjecie_glowne][fields][2]=height&populate[zdjecie_glowne][fields][3]=alternativeText&populate[galeria][fields][0]=url&populate[galeria][fields][1]=width&populate[galeria][fields][2]=height&populate[galeria][fields][3]=alternativeText`,
			{
				cache: 'no-cache',
				headers: { Authorization: `Bearer ${API_TOKEN}` },
			}
		);
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
		console.error(error);
	}
};

const PostPage = async ({ params }: { params: { post: string[] } }) => {
	if (params.post[1] === undefined) return null;

	const data = await getPost(params.post[1]);

	if ('errMsg' in data) {
		throw new Error(data.errMsg);
	}
	const { publishedAt, tytul, zawartosc_posta, zdjecie_glowne, galeria } = data.attributes;

	const blurderMainPicutre = await getBase64(zdjecie_glowne.data.attributes.url);
	const galleryWithBluredUrl = await getBase64ForAllImg(galeria);
	console.log(galleryWithBluredUrl);
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
