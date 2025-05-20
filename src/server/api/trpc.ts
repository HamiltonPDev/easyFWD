import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { pageRouter } from './routers/page';

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  page: pageRouter,
});

export type AppRouter = typeof appRouter; 