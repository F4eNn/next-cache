/** @format */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get('secret');

	if (secret !== process.env.NEXT_REVALIDATE_TOKEN) {
		return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
			status: 401,
			statusText: 'Unauthorized',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	const path = request.nextUrl.searchParams.get('path') || '/';
	console.log(path);
	revalidatePath(path, 'page');

	return NextResponse.json({ revalidated: true });
}
