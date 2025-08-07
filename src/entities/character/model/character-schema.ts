import * as z from 'zod';
import { ResponsePage } from '@shared';

export const Character = z.object({
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

export type Character = z.infer<typeof Character>;

export const CharacterResponse = z.object({
  page: ResponsePage,
  characters: z.array(Character),
});

export type CharacterResponse = z.infer<typeof CharacterResponse>;
