// This middleware file is used to protect all routes under /admin in a Next.js application using next-auth for authentication.

// Import the withAuth helper from next-auth/middleware, which wraps the middleware function to add authentication logic.
import { withAuth } from 'next-auth/middleware';
// Import NextResponse to control the response from the middleware.
import { NextResponse } from 'next/server';

/* Export the default middleware, wrapped with withAuth.
The middleware function itself currently just calls NextResponse.next(), allowing the request to proceed.
The second argument to withAuth is a configuration object with callbacks.*/
export default withAuth(
  function middleware(req) {
    // This is where you could add custom logic for every request if needed.
    return NextResponse.next();
  },
  {
    callbacks: {
      // The 'authorized' callback determines if the user is allowed to access the route.
      // It receives the user's token and only allows access if the user's role is 'admin'.
      authorized: ({ token }) => {
        // Only allow access to admin routes if user has admin role
        return token?.role === 'admin';
      },
    },
  }
);

// The config object tells Next.js to apply this middleware only to routes under /admin.
export const config = {
  matcher: ['/admin/:path*'],
}; 