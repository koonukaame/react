import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { CharsTable } from '../CharsTable';
import { CharactersContext } from '../../features';
import { mockChars } from '../../test-utils';

describe('CharsTable component', () => {
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

  it('calls setSelectedChar when a table element is clicked', () => {
    const mockChar = mockChars[0];
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

    const char = screen.getByText(mockChar.name);
    fireEvent.click(char);
    expect(mockSetSelectedChar).toHaveBeenCalledWith(mockChar.uid);
  });
});
