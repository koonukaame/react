import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { mockChars } from '../../../../test-utils';
import { CharacterList } from './CharacterList';
import { createRoutesStub } from 'react-router';

describe('CharsTable component', () => {
  it('renders without errors', () => {
    const mockProps = {
      characters: mockChars,
    };

    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => <CharacterList {...mockProps} />,
      },
    ]);

    render(<Stub initialEntries={['/']} />);

    const characterList = screen.getByTestId('character-list');
    expect(characterList).toBeInTheDocument();
  });
});
