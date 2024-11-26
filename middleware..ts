import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/barista')) {
    return NextResponse.redirect(new URL('/barista/login', req.url));
  }

  return NextResponse.next();
}
