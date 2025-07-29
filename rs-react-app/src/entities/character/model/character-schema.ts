import * as z from 'zod';

export const charSchema = z.object({
  uid: z.string(),
  name: z.string(),
  gender: z.string().nullable(),
  yearOfBirth: z.number().nullable(),
  yearOfDeath: z.number().nullable(),
  placeOfBirth: z.string().nullable(),
  placeOfDeath: z.string().nullable(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  deceased: z.boolean().nullable(),
});

export const responseSchema = z.object({
  page: z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    numberOfElements: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    firstPage: z.boolean(),
    lastPage: z.boolean(),
  }),
  characters: z.array(charSchema),
});
