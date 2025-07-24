import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { CharsResult } from './CharsResult';
import { CharactersContext } from '../../features';
import { render, screen } from '@testing-library/react';
import { mockChars } from '../../test-utils';

describe('CharsTable component', () => {
  describe('Rendering', () => {
    it('renders MsgBlock when characters array is empty', () => {
      const mockContext = {
        characters: [],
        setSelectedChar: () => {},
      };

      render(
        <CharactersContext.Provider value={mockContext}>
          <CharsResult />
        </CharactersContext.Provider>
      );

      const charsTable = screen.queryByTestId('chars-table');
      const notFoundTitle = screen.getByText('No characters found 🕵️‍♀️');
      const notFoundMsg = screen.getByText(
        'Try adjusting your search, maybe a typo snuck in?'
      );
      const msgBlock = screen.getByTestId('msg-block');

      expect(msgBlock).toBeInTheDocument();
      expect(notFoundTitle).toBeInTheDocument();
      expect(notFoundMsg).toBeInTheDocument();
      expect(charsTable).not.toBeInTheDocument();
    });

    it('renders CharsTable when characters array is not empty', () => {
      const mockContext = {
        characters: mockChars,
        setSelectedChar: () => {},
      };

      render(
        <CharactersContext.Provider value={mockContext}>
          <CharsResult />
        </CharactersContext.Provider>
      );

      const charsTable = screen.getByTestId('chars-table');
      const notFoundTitle = screen.queryByText('No characters found 🕵️‍♀️');
      const notFoundMsg = screen.queryByText(
        'Try adjusting your search, maybe a typo snuck in?'
      );
      const msgBlock = screen.queryByTestId('msg-block');

      expect(msgBlock).not.toBeInTheDocument();
      expect(charsTable).toBeInTheDocument();
      expect(notFoundTitle).not.toBeInTheDocument();
      expect(notFoundMsg).not.toBeInTheDocument();
    });
  });
});
