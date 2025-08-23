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
      const newForm = action.payload;
      const sameTypeForm = state.filter((form) => form.type === newForm.type);

      if (sameTypeForm.length > 2) {
        const oldestFormIndex = state.findIndex(
          (form) => form.type === newForm.type
        );
        if (oldestFormIndex !== -1) {
          state.splice(oldestFormIndex, 1);
        }
      }
      state.push(newForm);
    },
  },
});

export const { addForm } = formsSlice.actions;
