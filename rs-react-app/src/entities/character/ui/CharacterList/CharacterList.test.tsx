import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { mockChars, mockStore } from '../../../../test-utils';
import { CharacterList } from './CharacterList';
import { createRoutesStub } from 'react-router';
import { Provider } from 'react-redux';

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
});
