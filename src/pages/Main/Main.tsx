'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { SearchForm, Spinner, Pagination } from '@components';
import {
  CharacterList,
  startrackApi,
  useSearchCharacterQuery,
} from '@entities';
import { Button, MsgBlock, SEARCH_KEY, useLocalStorage } from '@shared';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export const Main = ({ children }: Props) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') ?? '';
  const [page, setPage] = useState<number>(() =>
    isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)
  );
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_KEY);

  const { data, isFetching, isError, isSuccess } = useSearchCharacterQuery({
    name: searchTerm,
    pageNumber: page,
  });

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col" data-testid="main-page">
      <div className="max-w pt-3">
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
            Refetch Characters
          </Button>
        </div>
      </div>
      <div className="h-[60vh] flex flex-row flex-grow mt-3 overflow-hidden">
        {isFetching ? (
          <Spinner isFullScreen />
        ) : isError ? (
          <MsgBlock
            title="An unexpected error has occured"
            msg="Try again in a bit!"
          />
        ) : isSuccess && data.characters.length === 0 ? (
          <MsgBlock
            title="No characters found 🕵️‍♀️"
            msg="Try adjusting your search, maybe a typo snuck in?"
          />
        ) : (
          isSuccess && <CharacterList characters={data.characters} />
        )}
        {children}
      </div>

      <div className="max-w pt-6 flex items-center justify-center relative">
        <Pagination
          page={page}
          onChange={handlePageChange}
          totalPages={data?.page.totalPages ?? 1}
        />
      </div>
    </div>
  );
};
