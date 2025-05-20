import { z } from 'zod';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const pageRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input.name ?? 'world'}!`,
      };
    }),
}); 