import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES_LIST } from '../shared/constants/index';

const initialState: string[] = COUNTRIES_LIST;

export const countriesSlice = createSlice({
  initialState,
  name: 'countries',
  reducers: {},
});
