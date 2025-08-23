import { configureStore } from '@reduxjs/toolkit';
import { formsSlice } from '@features';

export const formsStore = configureStore({
  reducer: {
    forms: formsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof formsStore.getState>;
export type AppDispatch = typeof formsStore.dispatch;
