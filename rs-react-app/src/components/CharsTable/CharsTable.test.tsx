import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { CharsTable } from '../CharsTable';
import { CharactersContext } from '../../features';
import { mockChars } from '../../test-utils';

describe('CharsTable component', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const mockContext = {
        characters: mockChars,
        setSelectedChar: () => {},
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
    it('displays only character names and hides all other fields', () => {
      const mockContext = {
        characters: mockChars,
        setSelectedChar: () => {},
      };

      render(
        <CharactersContext.Provider value={mockContext}>
          <CharsTable />
        </CharactersContext.Provider>
      );

      mockChars.map((char) => {
        expect(screen.getByText(char.name)).toBeInTheDocument();

        for (const [key, value] of Object.entries(char)) {
          if (!(key === 'name')) {
            expect(
              screen.queryByText((_, el) => el?.textContent === String(value))
            ).not.toBeInTheDocument();
          }
        }
      });
    });
  });
  describe('Interaction', () => {
    it('calls setSelectedChar when a table element is clicked', () => {
      const mockSetSelectedChar = vi.fn();
      const mockContext = {
        characters: mockChars,
        setSelectedChar: mockSetSelectedChar,
      };

      render(
        <CharactersContext.Provider value={mockContext}>
          <CharsTable />
        </CharactersContext.Provider>
      );

      for (const char of mockChars) {
        fireEvent.click(screen.getByText(char.name));
        expect(mockSetSelectedChar).toHaveBeenCalledWith(char.uid);
      }
      expect(mockSetSelectedChar).toHaveBeenCalledTimes(mockChars.length);
    });
  });
});
