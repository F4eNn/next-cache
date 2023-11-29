/** @format */
import { getBase64, getBase64ForAllImg } from '@/utils/blurdDataUrl';
import Image from 'next/image';

import React from 'react';

const Gallery = async ({ galeria }: { galeria: any }) => {
	if (!galeria) return;
	console.log(galeria);
    // const blurderMainPicutre = await getBase64(zdjecie_glowne.data.attributes.url);
	const galleryWithBluredUrl = await getBase64ForAllImg(galeria);
	return (
		<>
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
		</>
	);
};

export default Gallery;
