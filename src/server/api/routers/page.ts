import { z } from 'zod';
import { initTRPC, TRPCError } from '@trpc/server';
import { PageModel } from '../../../models/Page';

// This line initializes the tRPC instance with a context type that optionally includes a "session" property.
// The context is used to pass request-scoped data (like authentication/session info) to procedures.
// "t" is the main entry point for creating routers and procedures in tRPC.
const t = initTRPC.context<{ session?: unknown }>().create();

type SessionWithUser = {
  user?: {
    role?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function requireAdminOrEdit(session?: SessionWithUser) {
  if (
    !session ||
    !session.user ||
    !session.user.role ||
    !['admin', 'editor'].includes(session.user.role)
  ) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be an admin or editor to perform this action',
    });
  }
}

/* tRPC-procedure met duidelijke inputvalidatie en foutafhandeling voor de pagina's */
export const pageRouter = t.router({
  /* Get all pages */
  getAll: t.procedure.query(async () => {
    return PageModel.find().sort({ createdAt: -1 });
  }),

  /* Get a page by slug (with sections) */
  getBySlug: t.procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const page = await PageModel.findBySlug(input.slug);
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found' });
      return page;
    }),

  /* Create a new page */
  create: t.procedure
    .input(z.object({
      title: z.string().min(1),
      slug: z.string().min(1),
      content: z.string().min(1),
      imageUrl: z.string().url().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Optional: check for admin/editor role in ctx.session
      requireAdminOrEdit(ctx.session as SessionWithUser | undefined);
      const exists = await PageModel.findOne({ slug: input.slug });
      if (exists) throw new TRPCError({ code: 'CONFLICT', message: 'Slug already exists' });
      const page = await PageModel.create(input);
      return page;
    }),

  /* Update a page by slug */
  update: t.procedure
    .input(z.object({
      slug: z.string(),
      data: z.object({
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        imageUrl: z.string().url().optional(),
      }),
    }))
    .mutation(async ({ input, ctx }) => {
      requireAdminOrEdit(ctx.session as SessionWithUser | undefined);
      const page = await PageModel.findOneAndUpdate(
        { slug: input.slug },
        { $set: input.data },
        { new: true }
      );
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found' });
      return page;
    }),

  /* Delete a page by slug */
  delete: t.procedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      requireAdminOrEdit(ctx.session as SessionWithUser | undefined);
      const page = await PageModel.findOneAndDelete({ slug: input.slug });
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found' });
      return { success: true };
    }),

  /* Update a section by type */
  updateSection: t.procedure
    .input(
      z.object({
        slug: z.string(),
        sectionType: z.string(),
        data: z.record(z.unknown()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      requireAdminOrEdit(ctx.session as SessionWithUser | undefined);
      const page = await PageModel.findOneAndUpdate(
        { slug: input.slug, 'sections.type': input.sectionType },
        { $set: { 'sections.$.data': input.data } },
        { new: true }
      );
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page or section not found' });
      return page;
    }),

  /* Add a new section to a page */
  addSection: t.procedure
    .input(
      z.object({
        slug: z.string(),
        section: z.object({
          type: z.string(),
          data: z.record(z.unknown()),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      requireAdminOrEdit(ctx.session as SessionWithUser | undefined);
      const page = await PageModel.findOneAndUpdate(
        { slug: input.slug },
        { $push: { sections: input.section } },
        { new: true }
      );
      if (!page) throw new TRPCError({ code: 'NOT_FOUND', message: 'Page not found' });
      return page;
    }),
});