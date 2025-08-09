import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Main } from './Main';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResponsePage } from '@shared';
import { createRoutesStub } from 'react-router';
import { mockChars, mockStore } from '@test';
import { Provider } from 'react-redux';
import {
  startrackApi,
  useSearchCharacterQuery,
} from '../../entities/character/api/startrack';

const mockPage: ResponsePage = {
  pageNumber: 3,
  pageSize: 50,
  numberOfElements: 50,
  totalElements: 123,
  totalPages: 2,
  firstPage: false,
  lastPage: false,
};

vi.mock('../../entities/character/api/startrack', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('../../entities/character/api/startrack')
    >();
  return {
    ...actual,
    useSearchCharacterQuery: vi.fn(),
  };
});

const setSearchParamsMock = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ page: mockPage.pageNumber.toString() }),
      setSearchParamsMock,
    ],
  };
});

describe('Main page', () => {
  const Stub = createRoutesStub([
    {
      path: '/character',
      Component: () => {
        return (
          <Provider store={mockStore}>
            <Main />
          </Provider>
        );
      },
    },
  ]);

  beforeAll(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders page', async () => {
      vi.mocked(useSearchCharacterQuery).mockReturnValue({
        data: { characters: [], page: mockPage },
        isFetching: true,
        isError: false,
        refetch: vi.fn(),
      });

      await act(async () => {
        render(<Stub initialEntries={['/character']} />);
      });

      const mainPage = screen.getByTestId('main-page');

      expect(mainPage).toBeInTheDocument();
    });
  });

  it('renders MsgBlock component when searchCharacter query fails', async () => {
    vi.mocked(useSearchCharacterQuery).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    await act(async () => {
      render(<Stub initialEntries={['/character']} />);
    });

    const msgBlock = screen.getByTestId('msg-block');
    expect(msgBlock).toBeInTheDocument();
  });

  it('calls setSearchParams with new page number on pagination button click', async () => {
    vi.mocked(useSearchCharacterQuery).mockReturnValue({
      data: { characters: mockChars, page: mockPage },
      isFetching: true,
      isError: false,
      refetch: vi.fn(),
    });

    await act(async () => {
      render(
        <Stub initialEntries={[`/character/?page=${mockPage.pageNumber}`]} />
      );
    });

    const prevButton = await screen.findByTestId('previous-button');
    await act(async () => {
      fireEvent.click(prevButton);
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: (mockPage.pageNumber - 1).toString(),
    });
  });

  describe('Invalidation', () => {
    it('invalidates getCharacter cache when clicking Refetch Characters button', async () => {
      const dispatch = vi.fn();
      vi.spyOn(mockStore, 'dispatch').mockImplementation(dispatch);

      vi.mocked(useSearchCharacterQuery).mockReturnValue({
        data: { characters: mockChars, page: mockPage },
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      });

      await act(async () => {
        render(<Stub initialEntries={['/character']} />);
      });

      const refetchCharacterButton = screen.getByTestId('refetch-character');
      await act(async () => {
        fireEvent.click(refetchCharacterButton);
      });

      expect(dispatch).toHaveBeenCalledWith(
        startrackApi.util.invalidateTags(['getCharacter'])
      );
    });

    it('invalidates searchCharacter cache when clicking Refetch List button', async () => {
      const dispatch = vi.fn();
      vi.spyOn(mockStore, 'dispatch').mockImplementation(dispatch);

      vi.mocked(useSearchCharacterQuery).mockReturnValue({
        data: { characters: mockChars, page: mockPage },
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      });

      await act(async () => {
        render(<Stub initialEntries={['/character']} />);
      });

      const refetchCharacterButton = screen.getByTestId('refetch-list');
      await act(async () => {
        fireEvent.click(refetchCharacterButton);
      });

      expect(dispatch).toHaveBeenCalledWith(
        startrackApi.util.invalidateTags(['searchCharacter'])
      );
    });
  });
});
