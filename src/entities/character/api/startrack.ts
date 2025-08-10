import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterResponse, type Character } from '../model';

type getCharacterResponse = { character: Character };

type SearchCharacterArguments = {
  name: string;
  pageNumber: number;
};

export const startrackApi = createApi({
  reducerPath: 'startrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/character',
  }),
  tagTypes: ['getCharacter', 'searchCharacter'],
  endpoints: (build) => ({
    getCharacter: build.query<Character, string>({
      providesTags: ['getCharacter'],
      query: (uid) => `?uid=${uid}`,
      transformResponse: (response: getCharacterResponse) => response.character,
    }),

    searchCharacter: build.query<CharacterResponse, SearchCharacterArguments>({
      query: ({ name, pageNumber }) => {
        const formData = new URLSearchParams();
        formData.append('name', name);

        return {
          url: `search?pageNumber=${pageNumber - 1}`,
          body: formData,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
      providesTags: ['searchCharacter'],
      transformResponse: (response: CharacterResponse) => ({
        characters: response.characters,
        page: {
          ...response.page,
          pageNumber: response.page.pageNumber + 1,
        },
      }),
    }),
  }),
});

export const { useGetCharacterQuery, useSearchCharacterQuery } = startrackApi;
