import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from '../features';
import { startrackApi } from '../entities/character/api/index';

export const mockStore = configureStore({
  reducer: {
    select: selectSlice.reducer,
    [startrackApi.reducerPath]: startrackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(startrackApi.middleware),
});
