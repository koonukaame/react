import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character } from '../model';

type Response = { character: Character };

export const startrackApi = createApi({
  reducerPath: 'startrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/character',
  }),
  endpoints: (build) => ({
    getCharacter: build.query<Character, string>({
      query: (uid) => `?uid=${uid}`,
      transformResponse: (response: Response) => response.character,
    }),
  }),
});

export const { useGetCharacterQuery } = startrackApi;
