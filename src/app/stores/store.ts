import { configureStore } from '@reduxjs/toolkit';
import { countriesSlice, formsSlice } from '@features';

export const formsStore = configureStore({
  reducer: {
    forms: formsSlice.reducer,
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof formsStore.getState>;
export type AppDispatch = typeof formsStore.dispatch;
