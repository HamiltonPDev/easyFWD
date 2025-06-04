import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/* Protect /admin routes: only allow users with 'admin' or 'editor' role */
export default withAuth(
  () => NextResponse.next(),
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin' || token?.role === 'editor',
    },
  }
);

/* Apply middleware only to /admin routes */
export const config = {
  matcher: ['/admin/:path*'],
};