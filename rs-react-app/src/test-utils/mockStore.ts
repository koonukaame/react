import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from '../features';

export const mockStore = configureStore({
  reducer: {
    select: selectSlice.reducer,
  },
  preloadedState: {
    select: [],
  },
});
