import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES_LIST } from '@shared';

const initialState: string[] = COUNTRIES_LIST;

export const countriesSlice = createSlice({
  initialState,
  name: 'countries',
  reducers: {},
});
