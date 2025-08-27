import { countryApi } from '@entities';
import { configureStore } from '@reduxjs/toolkit/react';

export const store = configureStore({
  reducer: {
    [countryApi.reducerPath]: countryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countryApi.middleware),
});
