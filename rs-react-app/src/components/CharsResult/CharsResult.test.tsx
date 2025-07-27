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

      const msgBlock = screen.getByTestId('msg-block');

      expect(msgBlock).toBeInTheDocument();
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
      const msgBlock = screen.queryByTestId('msg-block');

      expect(msgBlock).not.toBeInTheDocument();
      expect(charsTable).toBeInTheDocument();
    });
  });
});
