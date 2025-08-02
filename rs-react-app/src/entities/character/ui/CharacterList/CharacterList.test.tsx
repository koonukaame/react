import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { mockChars, mockStore } from '../../../../test-utils';
import { CharacterList } from './CharacterList';
import { createRoutesStub } from 'react-router';
import { Provider } from 'react-redux';
import {
  selectCharacter,
  selectSlice,
  unselectCharacter,
} from '../../../../features';
import { configureStore } from '@reduxjs/toolkit';

describe('CharacterList component', () => {
  it('renders without errors', () => {
    const mockProps = {
      characters: mockChars,
    };

    const Stub = createRoutesStub([
      {
        path: '/character',
        Component: () => (
          <Provider store={mockStore}>
            <CharacterList {...mockProps} />
          </Provider>
        ),
      },
    ]);

    render(<Stub initialEntries={['/character']} />);

    const characterList = screen.getByTestId('character-list');
    expect(characterList).toBeInTheDocument();
  });

  describe('CharacterList logic', () => {
    it('dispatches selectCharacter if character is not selected', () => {
      const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

      const Stub = createRoutesStub([
        {
          path: '/character',
          Component: () => (
            <Provider store={mockStore}>
              <CharacterList characters={[mockChars[0]]} />
            </Provider>
          ),
        },
        {
          path: '/character/:uid',
          Component: () => <div>details</div>,
        },
      ]);
      render(<Stub initialEntries={['/character']} />);

      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes[0]).not.toBeChecked();
      fireEvent.click(checkboxes[0]);

      expect(dispatchSpy).toHaveBeenCalledWith(selectCharacter(mockChars[0]));
    });

    it('dispatches unselectCharacter if character is selected', () => {
      const store = configureStore({
        reducer: {
          select: selectSlice.reducer,
        },
        preloadedState: {
          select: [mockChars[0]],
        },
      });

      const dispatchSpy = vi.spyOn(store, 'dispatch');

      const Stub = createRoutesStub([
        {
          path: '/character',
          Component: () => (
            <Provider store={store}>
              <CharacterList characters={[mockChars[0]]} />
            </Provider>
          ),
        },
        {
          path: '/character/:uid',
          Component: () => <div>details</div>,
        },
      ]);
      render(<Stub initialEntries={['/character']} />);

      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes[0]).toBeChecked();
      fireEvent.click(checkboxes[0]);

      expect(dispatchSpy).toHaveBeenCalledWith(unselectCharacter(mockChars[0]));
    });
  });
});
