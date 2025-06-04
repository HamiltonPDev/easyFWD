/* This file is the main entry point for the tRPC server. */

import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { pageRouter } from './routers/page';

const t = initTRPC.create({
  transformer: superjson,
});

/* Here we will define the routers for the tRPC server. */
export const appRouter = t.router({
  page: pageRouter,
});

export type AppRouter = typeof appRouter; 