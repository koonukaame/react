import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { CharsTable } from './CharsTable';
import { CharactersContext } from '../features';
import type { Character } from '../entities';

describe('CharsTable component', () => {
  it('renders without errors', () => {
    const mockChars: Character[] = [
      {
        uid: '1',
        name: 'Aa',
        gender: 'F',
        yearOfBirth: 1,
        yearOfDeath: 10,
      },
      {
        uid: '2',
        name: 'Bb',
        gender: 'M',
        yearOfBirth: 2,
        yearOfDeath: 11,
      },
    ];

    const mockContext = {
      characters: mockChars,
    };

    render(
      <CharactersContext.Provider value={mockContext}>
        <CharsTable />
      </CharactersContext.Provider>
    );

    const charsTable = screen.getByTestId('chars-table');
    expect(charsTable).toBeInTheDocument();
  });

  it('correctly renders empty data', () => {
    const mockEmptyChar: Character[] = [
      {
        uid: '3',
        name: 'Cc',
        gender: null,
        yearOfBirth: null,
        yearOfDeath: null,
      },
    ];

    const mockContext = {
      characters: mockEmptyChar,
    };

    render(
      <CharactersContext.Provider value={mockContext}>
        <CharsTable />
      </CharactersContext.Provider>
    );

    expect(screen.getAllByText('Unknown')).toHaveLength(3);
  });
});
