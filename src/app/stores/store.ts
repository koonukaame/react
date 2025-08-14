import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from '@features';
import { startrackApi } from '../../entities/character/api/startrack';

export const makeStore = () => {
  return configureStore({
    reducer: {
      select: selectSlice.reducer,
      [startrackApi.reducerPath]: startrackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(startrackApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
