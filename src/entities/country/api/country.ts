/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Country } from '../model';

export const countryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  reducerPath: 'countryApi',
  endpoints: (builder) => ({
    getCountries: builder.query<Country, void>({
      query: () => 'owid-co2-data.json',
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;
