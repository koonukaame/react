import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../entities/character/model';

const initialState: Character[] = [];

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    selectCharacter: (state: Character[], action: PayloadAction<Character>) => {
      state.push(action.payload);
    },

    unselectCharacter: (
      state: Character[],
      action: PayloadAction<Character>
    ) => {
      return state.filter((character) => character.uid !== action.payload.uid);
    },

    unselectAll: (state: Character[]) => {
      state.length = 0;
    },
  },
});

export const { selectCharacter, unselectCharacter, unselectAll } =
  selectSlice.actions;
