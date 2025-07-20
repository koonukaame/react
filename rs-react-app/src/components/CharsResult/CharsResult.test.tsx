import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { CharsResult } from './CharsResult';
import { CharactersContext } from '../../features';
import { render, screen } from '@testing-library/react';
import { mockChars } from '../../test-utils';

describe('CharsTable component', () => {
  it('renders MsgBlock when characters array is empty', () => {
    const mockContext = {
      characters: [],
    };

    render(
      <CharactersContext.Provider value={mockContext}>
        <CharsResult />
      </CharactersContext.Provider>
    );

    expect(screen.getByTestId('msg-block')).toBeInTheDocument();
    expect(screen.queryByTestId('chars-table')).not.toBeInTheDocument();
  });

  it('renders CharsTable when characters array is not empty', () => {
    const mockContext = {
      characters: mockChars,
    };

    render(
      <CharactersContext.Provider value={mockContext}>
        <CharsResult />
      </CharactersContext.Provider>
    );

    expect(screen.queryByTestId('msg-block')).not.toBeInTheDocument();
    expect(screen.getByTestId('chars-table')).toBeInTheDocument();
  });
});
