import { NextResponse } from 'next/server';

import isAuth from './modules/auth/lib/isAuth';

export async function middleware(request) {
  const firmiCookie = request.cookies.get('firmi-cookie');
  const token = firmiCookie?.value || '';

  const nextUrl = request.nextUrl.pathname;

  const { authenticated, decoded } = await isAuth(token);

  if (!authenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (nextUrl.startsWith('/private/restaurant')) {
    if (decoded?.accountType === 'CLIENT')
      return NextResponse.redirect(
        new URL('/private/client/dashboard', request.url)
      );
  }

  if (nextUrl.startsWith('/private/client')) {
    if (decoded?.accountType === 'RESTAURANT')
      return NextResponse.redirect(
        new URL('/private/restaurant/dashboard', request.url)
      );
  }

  return NextResponse.next();
}

export const config = { matcher: ['/private/:path*'] };
