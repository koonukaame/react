import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from '@features';

export const mainStore = configureStore({
  reducer: {
    select: selectSlice.reducer,
  },
});

export type AppStore = typeof mainStore;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
