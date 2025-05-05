import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access to admin routes if user has admin role
        return token?.role === 'admin';
      },
    },
  }
);

// Protect all routes under /admin
export const config = {
  matcher: ['/admin/:path*'],
}; 