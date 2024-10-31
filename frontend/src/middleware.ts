import { NextRequest, NextResponse } from 'next/server';

import { Routes } from './lib/configs';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/jobs/:path*', '/signin', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    console.log('token', token);


    if (token && (url.pathname.startsWith('/signin') || url.pathname === '/')) {
        return NextResponse.redirect(new URL(Routes.jobList, request.url));
    }

    if (!token && url.pathname.startsWith(Routes.jobList)) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}