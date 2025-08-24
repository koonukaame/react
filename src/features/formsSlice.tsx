import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  country: string;
  gender: string;
  picture: string;
  type: 'controlled' | 'uncontrolled';
};

const initialState: FormData[] = [];

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state: FormData[], action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;
