import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from './lib/auth';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const reqAuth = req.auth;
  console.log('Middleware triggered for request:', reqAuth);
  const { pathname } = req.nextUrl;

  if (pathname === '/signin') {
    return NextResponse.next();
  }

  // const user = reqAuth?.user || null;

  // if (!user) {
  //   const loginUrl = new URL('/login', req.url);
  //   loginUrl.searchParams.set('callbackUrl', pathname);
  //   console.log('Redirecting unauthenticated user to login:', loginUrl.toString());
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (pathname === '/admin' && user.role === 'ADMIN') {
  //   console.log('Redirecting admin from /admin to /admin/dashboard');
  //   return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  // }

  // // /admin/** へのアクセス制御 (ADMINのみ)
  // if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
  //   console.log('Admin access denied for:', user.email, 'to', pathname);
  //   const redirectUrl = user.role === 'PARTNER' ? '/' : '/login'; // パートナーはトップへ
  //   return NextResponse.redirect(new URL(redirectUrl, req.url));
  // }

  // パートナーページへのアクセス制御 (例)
  /*
    if (pathname.startsWith('/partner') && token.role !== 'PARTNER') {
      console.log('Partner access denied for:', token.email, 'to', pathname);
      const redirectUrl = token.role === 'ADMIN' ? '/admin/dashboard' : '/login';
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    */

  // その他の認証済みアクセスは許可
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|verdy-logo.png).*)'],
};
