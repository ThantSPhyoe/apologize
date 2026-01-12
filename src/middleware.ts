import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  // const { pathname } = new URL(request.url);

  // if (pathname === '/en') {
  //   return NextResponse.redirect(new URL('/en/home', request.url));
  // }

  // if (!token?.access_token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (token.access_token && pathname === '/') {
  //   return NextResponse.redirect(new URL('/examinations', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/en',
  ],
};
