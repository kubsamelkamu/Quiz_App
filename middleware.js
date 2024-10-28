import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/firebaseAdmin';

initFirebaseAdmin(); 
export async function middleware(req) {
  const auth = getAuth();
  const token = req.cookies.token;

  try {
    if (token) {
      await auth.verifyIdToken(token); 
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', req.url)); 
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/quiz/:path*'], 
};
