import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../server/api/trpc';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../app/api/auth/[...nextauth]/route';

// This code defines a handler function for Next.js API routes that use tRPC.
// The handler receives a Request object and delegates the request to tRPC's fetchRequestHandler.
// - `endpoint` specifies the API route path for tRPC requests.
// - `req` is the incoming HTTP request.
// - `router` is the tRPC appRouter, which defines all available API procedures.
// - `createContext` is a function to provide context (like auth/session info) to tRPC procedures; here, it returns an empty object.
// The handler is exported for both GET and POST HTTP methods, allowing tRPC to handle both types of requests.

// tRPC context with NextAuth session
async function createContext() {
  const session = await getServerSession(authOptions);
  return { session };
}

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });
};

export { handler as GET, handler as POST }; 