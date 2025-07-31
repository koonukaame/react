import z from 'zod';

export const ResponsePage = z.object({
  pageNumber: z.number(),
  pageSize: z.number(),
  numberOfElements: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  firstPage: z.boolean(),
  lastPage: z.boolean(),
});

export type ResponsePage = z.infer<typeof ResponsePage>;
