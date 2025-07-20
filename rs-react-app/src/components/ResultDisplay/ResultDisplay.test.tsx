import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockChars } from '../test-utils';
import { CharactersContext } from '../features';
import { ResultDisplay } from './ResultDisplay';
import '@testing-library/jest-dom';

describe('ResultDisplay component', () => {
  const mockContext = {
    characters: mockChars,
  };

  it('renders CharsResult when component does not throw an error', () => {
    const hasError = false;

    render(
      <CharactersContext.Provider value={mockContext}>
        <ResultDisplay hasError={hasError} />
      </CharactersContext.Provider>
    );

    expect(screen.getByTestId('chars-table')).toBeInTheDocument();
    expect(screen.queryByTestId('msg-block')).not.toBeInTheDocument();
  });

  it('renders MsgBlock when component throws an error', () => {
    const hasError = true;

    render(
      <CharactersContext.Provider value={mockContext}>
        <ResultDisplay hasError={hasError} />
      </CharactersContext.Provider>
    );

    expect(screen.queryByTestId('chars-table')).not.toBeInTheDocument();
    expect(screen.getByTestId('msg-block')).toBeInTheDocument();
  });
});
