import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from '@features';
import { startrackApi } from '@entities';

export const mainStore = configureStore({
  reducer: {
    select: selectSlice.reducer,
    [startrackApi.reducerPath]: startrackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(startrackApi.middleware),
});

export type AppStore = typeof mainStore;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
