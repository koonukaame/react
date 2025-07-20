import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockChars } from './test-utils';
import { searchCharacter } from './services';

vi.mock('./services', () => ({
  searchCharacter: vi.fn(),
}));

describe('App component', () => {
  it('renders header and main', async () => {
    const mockedSearchCharacter = vi.mocked(searchCharacter);
    mockedSearchCharacter.mockResolvedValue({ characters: [] });

    await waitFor(() => {
      render(<App />);
    });

    const header = screen.getByTestId('header');
    const main = screen.getByTestId('main');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  it('renders spinner', async () => {
    const mockedSearchCharacter = vi.mocked(searchCharacter);

    mockedSearchCharacter.mockResolvedValue({
      characters: mockChars,
    });

    render(<App />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Aa' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('Aa')).not.toBeInTheDocument();
  });

  it('renders result after loading', async () => {
    const mockedSearchCharacter = vi.mocked(searchCharacter);

    mockedSearchCharacter.mockResolvedValue({
      characters: mockChars,
    });

    render(<App />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Aa' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Aa')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
