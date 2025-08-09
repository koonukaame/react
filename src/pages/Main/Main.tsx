import { useCallback, useState } from 'react';
import { SearchForm, Spinner, Pagination } from '@components';
import {
  CharacterList,
  startrackApi,
  useSearchCharacterQuery,
} from '@entities';
import { Button, MsgBlock, SEARCH_KEY, useLocalStorage } from '@shared';
import { Outlet, useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux';

export const Main = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page') ?? '';
  const [page, setPage] = useState<number>(() =>
    isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)
  );
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_KEY);

  const { data, isFetching, isError } = useSearchCharacterQuery({
    name: searchTerm,
    pageNumber: page,
  });

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      setSearchParams({
        page: page.toString(),
      });
    },
    [setSearchParams]
  );

  return (
    <main
      className="flex flex-col min-h-screen max-w overflow-hidden"
      data-testid="main-page"
    >
      <div className="max-w pt-6">
        <SearchForm onSearch={setSearchTerm} />
        <div className="flex mt-3 gap-3">
          <Button
            data-testid="refetch-list"
            onClick={() =>
              dispatch(startrackApi.util.invalidateTags(['searchCharacter']))
            }
          >
            Refetch List
          </Button>
          <Button
            data-testid="refetch-character"
            onClick={() =>
              dispatch(startrackApi.util.invalidateTags(['getCharacter']))
            }
          >
            Refetch Character
          </Button>
        </div>
      </div>
      <div className="max-h-[80vh] flex flex-row flex-grow pt-6 overflow-hidden">
        {isFetching ? (
          <Spinner isFullScreen />
        ) : isError ? (
          <MsgBlock
            title="An unexpected error has occured"
            msg="Try again in a bit!"
          />
        ) : data?.characters?.length === 0 ? (
          <MsgBlock
            title="No characters found 🕵️‍♀️"
            msg="Try adjusting your search, maybe a typo snuck in?"
          />
        ) : (
          <CharacterList characters={data?.characters ?? []} />
        )}
        <Outlet />
      </div>

      <div className="max-w pt-6 flex items-center justify-center relative">
        <Pagination
          page={page}
          onChange={handlePageChange}
          totalPages={data?.page.totalPages ?? 1}
        />
      </div>
    </main>
  );
};
