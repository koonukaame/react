import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Main } from './Main';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { searchCharacter } from '../../entities';
import { ResponsePage } from '../../shared';
import { createRoutesStub } from 'react-router';
import { mockChars, mockStore } from '../../test-utils';
import { Provider } from 'react-redux';

const mockPage: ResponsePage = {
  pageNumber: 3,
  pageSize: 50,
  numberOfElements: 50,
  totalElements: 123,
  totalPages: 2,
  firstPage: false,
  lastPage: false,
};

vi.mock('../../entities', async () => {
  const originalModule = await vi.importActual('../../entities');
  return {
    ...originalModule,
    searchCharacter: vi.fn(),
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
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({
        ok: true,
        characters: [],
        page: mockPage,
      });

      await act(async () => {
        render(<Stub initialEntries={['/character']} />);
      });

      const mainPage = screen.getByTestId('main-page');

      expect(mainPage).toBeInTheDocument();
    });
  });

  it('shows error message when searchCharacter fails', async () => {
    const mockedSearchCharacter = vi.mocked(searchCharacter);
    mockedSearchCharacter.mockResolvedValue({
      ok: false,
      message: 'api error',
    });

    await act(async () => {
      render(<Stub initialEntries={['/character']} />);
    });

    const msgBlock = screen.getByTestId('msg-block');
    expect(msgBlock).toBeInTheDocument();
  });

  it('calls setSearchParams with new page number on pagination button click', async () => {
    vi.mocked(searchCharacter).mockResolvedValue({
      ok: true,
      characters: mockChars,
      page: mockPage,
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
});
