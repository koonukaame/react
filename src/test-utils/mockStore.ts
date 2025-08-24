import { countriesSlice, formsSlice } from '@features';
import { configureStore } from '@reduxjs/toolkit';

export const mockStore = configureStore({
  reducer: {
    forms: formsSlice.reducer,
    countries: countriesSlice.reducer,
  },
});
