import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { searchCharacter } from './services';
import { SEARCH_KEY } from './shared';
import { mockChars } from './test-utils';

vi.mock('./services', () => ({
  searchCharacter: vi.fn(),
}));

describe('App component', () => {
  describe('Rendering', () => {
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
  });

  describe('LocalStorage Integration', () => {
    it('retrieves saved search term on component mount', async () => {
      localStorage.setItem(SEARCH_KEY, 'Nnn');

      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({ characters: [] });

      await waitFor(() => {
        render(<App />);
      });

      const searchInput = screen.getByDisplayValue('Nnn');
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    it('success handle', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({ characters: mockChars });

      render(<App />);

      const button = screen.getByTestId('search-button');
      fireEvent.click(button);

      await waitFor(() => {
        mockChars.map((chat) => {
          const charName = screen.getByText(chat.name);
          expect(charName).toBeInTheDocument();
        });
      });
    });

    it('error handle', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockRejectedValue({ characters: mockChars });

      render(<App />);

      const button = screen.getByTestId('search-button');
      fireEvent.click(button);

      await waitFor(() => {
        mockChars.map((chat) => {
          const charName = screen.queryByText(chat.name);
          expect(charName).not.toBeInTheDocument();
        });

        const errorTitle = screen.getByText('An unexpected error has occured');
        const errorDescription = screen.getByText('Try again in a bit!');
        expect(errorTitle).toBeInTheDocument();
        expect(errorDescription).toBeInTheDocument();
      });
    });
  });
});
