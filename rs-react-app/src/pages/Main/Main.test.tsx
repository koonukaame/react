import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';
import { Main } from './MainPage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { searchCharacter } from '../../services';
import { SEARCH_KEY } from '../../shared';
import { mockChars } from '../../test-utils';
import type { Page } from '../../entities';

vi.mock('../../services', () => ({
  searchCharacter: vi.fn(),
}));

describe('App component', () => {
  const mockPage: Page = {
    pageNumber: 2,
    pageSize: 50,
    numberOfElements: 50,
    totalElements: 123,
    totalPages: 2,
    firstPage: false,
    lastPage: false,
  };
  describe('Rendering', () => {
    it('renders header and main', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        characters: [],
        page: mockPage,
      });

      await waitFor(() => {
        render(<Main />);
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
      mockedSearchCharacter.mockResolvedValue({
        characters: [],
        page: mockPage,
      });

      await waitFor(() => {
        render(<Main />);
      });

      const searchInput = screen.getByDisplayValue('Nnn');
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    let errorMock: MockInstance;

    beforeEach(() => {
      errorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      errorMock.mockRestore();
    });

    it('success handle', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        characters: mockChars,
        page: mockPage,
      });

      render(<Main />);

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

      render(<Main />);

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
