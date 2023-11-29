/** @format */

import { API_TOKEN, BACKEND_URL_API } from '@/config';
import Image from 'next/image';
import Link from 'next/link';

export interface RootDataType<T> {
  id: number;
  attributes: T;
}

export interface IPartialArticleData {
  tytul: string;
  krotki_opis: string;
  slug: string;
  publishedAt: string;
  zdjecie_glowne: {
     data: {
        id: number;
        attributes: {
           alternativeText: string;
           hash: string;
           url: string;
        };
     };
  };
}

const getArticles = async () => {
	const URL = `${BACKEND_URL_API}/home-posts?sort[0]=id:desc&populate[zdjecie_glowne][fields][0]=url&populate[zdjecie_glowne][fields][1]=alternativeText&populate[zdjecie_glowne][fields][2]=hash&fields[0]=tytul&fields[1]=krotki_opis&fields[2]=slug&fields[3]=publishedAt&pagination[pageSize]=7`;

	const res = await fetch(URL, { cache: 'no-cache', headers: { Authorization: `Bearer ${API_TOKEN}` } });
	const { data }: { data: RootDataType<IPartialArticleData>[] } = await res.json();
	return data;
};

export default async function Home() {
  const data = await getArticles();

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='z-10 max-w-5xl w-full items-center  justify-between font-mono text-sm lg:flex'>
				<Link href={`/artykul/czwarty-tytul`}  className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
					Get started by editinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg&nbsp;
					<code className='font-mono font-bold'>{data[0].attributes.krotki_opis}</code>
				</Link>
          <Image src={data[0].attributes.zdjecie_glowne.data.attributes.url} width={500} height={500} alt='' className='h-40 w-40 object-cover'/>
			</div>
		</main>
	);
}
