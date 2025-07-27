import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockChars } from '../../test-utils';
import { CharactersContext } from '../../features';
import { ResultDisplay } from './ResultDisplay';
import '@testing-library/jest-dom';

describe('ResultDisplay component', () => {
  const mockContext = {
    characters: mockChars,
    setSelectedChar: () => {},
  };

  describe('Rendering', () => {
    it('renders Spinner when loading is true', () => {
      const hasError = false;
      const isLoading = true;

      render(
        <CharactersContext.Provider value={mockContext}>
          <ResultDisplay hasError={hasError} isLoading={isLoading} />
        </CharactersContext.Provider>
      );

      const spinner = screen.getByTestId('spinner');
      const charsTable = screen.queryByTestId('chars-table');
      const msgBlock = screen.queryByTestId('msg-block');

      expect(spinner).toBeInTheDocument();
      expect(charsTable).not.toBeInTheDocument();
      expect(msgBlock).not.toBeInTheDocument();
    });

    it('renders CharsResult when component does not throw an error', () => {
      const hasError = false;
      const isLoading = false;

      render(
        <CharactersContext.Provider value={mockContext}>
          <ResultDisplay hasError={hasError} isLoading={isLoading} />
        </CharactersContext.Provider>
      );

      const spinner = screen.queryByTestId('spinner');
      const charsTable = screen.getByTestId('chars-table');
      const msgBlock = screen.queryByTestId('msg-block');

      expect(charsTable).toBeInTheDocument();
      expect(msgBlock).not.toBeInTheDocument();
      expect(spinner).not.toBeInTheDocument();
    });

    it('renders MsgBlock when component throws an error', () => {
      const hasError = true;
      const isLoading = false;

      render(
        <CharactersContext.Provider value={mockContext}>
          <ResultDisplay hasError={hasError} isLoading={isLoading} />
        </CharactersContext.Provider>
      );

      const spinner = screen.queryByTestId('spinner');
      const charsTable = screen.queryByTestId('chars-table');
      const msgBlock = screen.getByTestId('msg-block');

      expect(charsTable).not.toBeInTheDocument();
      expect(spinner).not.toBeInTheDocument();
      expect(msgBlock).toBeInTheDocument();
    });
  });
});
