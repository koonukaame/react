import { describe, expect, it } from 'vitest';
import {
  selectCharacter,
  selectSlice,
  unselectAll,
  unselectCharacter,
} from './selectSlice';
import { mockChars } from '../../test-utils';

describe('selectSlice', () => {
  it('adds character to the state', () => {
    const state = selectSlice.reducer([], selectCharacter(mockChars[0]));
    expect(state).toEqual([mockChars[0]]);
  });

  it('removes character from the state', () => {
    const initState = mockChars;
    const state = selectSlice.reducer(
      initState,
      unselectCharacter(mockChars[0])
    );
    expect(state).toEqual(mockChars.slice(1));
  });

  it('removes all characters from the state', () => {
    const initState = mockChars;
    const state = selectSlice.reducer(initState, unselectAll());
    expect(state).toEqual([]);
  });
});
