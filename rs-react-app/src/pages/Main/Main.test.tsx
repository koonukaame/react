import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';
import { Main } from './MainPage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getCharacter, searchCharacter } from '../../services';
import { SEARCH_KEY } from '../../shared';
import { mockChars } from '../../test-utils';
import type { Page } from '../../entities';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';

vi.mock('../../services', async () => {
  const originalModule = await vi.importActual('../../services');
  return {
    ...originalModule,
    searchCharacter: vi.fn(),
    getCharacter: vi.fn(),
  };
});

describe('Main page', () => {
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
    it('renders page', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        characters: [],
        page: mockPage,
      });

      await waitFor(() => {
        render(
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        );
      });

      const mainPage = screen.getByTestId('main-page');

      expect(mainPage).toBeInTheDocument();
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
        render(
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        );
      });

      const searchInput = screen.getByDisplayValue('Nnn');
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    let errorMock: MockInstance;

    beforeAll(() => {
      errorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
      errorMock.mockRestore();
    });

    it('success handle of all characters retrieving', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        characters: mockChars,
        page: mockPage,
      });

      await waitFor(() => {
        render(
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        );
      });

      const button = screen.getByTestId('search-button');
      fireEvent.click(button);

      await waitFor(() => {
        mockChars.map((chat) => {
          const charName = screen.getByText(chat.name);
          expect(charName).toBeInTheDocument();
        });
      });
    });

    it('error handle of all characters retrieving', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockRejectedValue(new Error('error'));

      await waitFor(() => {
        render(
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        );
      });

      const button = screen.getByTestId('search-button');
      fireEvent.click(button);

      await waitFor(() => {
        mockChars.map((char) => {
          const charName = screen.queryByText(char.name);
          expect(charName).not.toBeInTheDocument();
        });

        const msgBlock = screen.getByTestId('msg-block');
        expect(msgBlock).toBeInTheDocument();
      });
    });

    it('success handle of one character retrieving', async () => {
      const oneChar = mockChars[0];
      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockResolvedValue({ character: oneChar });
      const mockRoutes = [
        {
          path: ':uid',
          element: <Main />,
        },
      ];

      const testRouter = createMemoryRouter(mockRoutes, {
        initialEntries: [`/${oneChar.uid}`],
      });

      render(<RouterProvider router={testRouter} />);

      await waitFor(() => {
        const itemDetails = screen.getByTestId('item-details');
        expect(itemDetails).toBeInTheDocument();
      });
    });

    it('error handle of one character retrieving', async () => {
      const oneChar = mockChars[0];
      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockRejectedValue(new Error('error'));
      const mockRoutes = [
        {
          path: ':uid',
          element: <Main />,
        },
      ];

      const testRouter = createMemoryRouter(mockRoutes, {
        initialEntries: [`/${oneChar.uid}`],
      });

      render(<RouterProvider router={testRouter} />);

      await waitFor(() => {
        const itemDetails = screen.queryByTestId('item-details');
        expect(itemDetails).not.toBeInTheDocument();
      });
    });
  });

  describe('searchParams handling', () => {
    const mockRoutes = [
      {
        path: '/character/:uid',
        element: <Main />,
      },
      {
        path: '/',
        element: <Main />,
      },
    ];

    it('removes ItemDetails component & clears URL', async () => {
      const oneChar = mockChars[0];
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        characters: mockChars,
        page: mockPage,
      });

      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockResolvedValue({ character: oneChar });

      const testRouter = createMemoryRouter(mockRoutes, {
        initialEntries: [`/character/${oneChar.uid}`],
      });

      render(<RouterProvider router={testRouter} />);

      await waitFor(() => {
        const itemDetails = screen.getByTestId('item-details');
        expect(itemDetails).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('item-details-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        const itemDetails = screen.queryByTestId('item-details');
        expect(itemDetails).not.toBeInTheDocument();
      });

      expect(testRouter.state.location.pathname).not.toBe(`/${oneChar.uid}`);
    });

    it('renders ItemDetails component & updates URL', async () => {
      const oneChar = mockChars[0];
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        characters: mockChars,
        page: mockPage,
      });

      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockResolvedValue({ character: oneChar });

      const testRouter = createMemoryRouter(mockRoutes, {
        initialEntries: ['/'],
      });
      render(<RouterProvider router={testRouter} />);

      await waitFor(() => {
        const charsTable = screen.getByTestId('chars-table');
        expect(charsTable).toBeInTheDocument();
      });

      const card = screen.getByText(oneChar.name);
      fireEvent.click(card);

      await waitFor(() => {
        const itemDetails = screen.getByTestId('item-details');
        expect(itemDetails).toBeInTheDocument();
      });

      expect(testRouter.state.location.pathname).toBe(
        `/character/${oneChar.uid}`
      );
    });
  });
});
