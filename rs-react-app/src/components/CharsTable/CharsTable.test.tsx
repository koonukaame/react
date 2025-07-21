import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { CharsTable } from '../CharsTable';
import { CharactersContext } from '../../features';
import type { Character } from '../../entities';
import { mockChars } from '../../test-utils';

describe('CharsTable component', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
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
  });

  describe('Data Display', () => {
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
});
