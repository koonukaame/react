'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { SearchForm, Spinner, Pagination, Flyout } from '@components';
import {
  CharacterList,
  CharacterResponse,
  startrackApi,
  useSearchCharacterQuery,
} from '@entities';
import { Button, MsgBlock, SEARCH_KEY } from '@shared';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  children: ReactNode;
  initialData: CharacterResponse;
};

export const Main = ({ children, initialData }: Props) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get('page') ?? '';
  const searchParam = searchParams.get(SEARCH_KEY) ?? '';
  const [page, setPage] = useState<number>(() =>
    isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)
  );
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [hasSearched, setHasSearched] = useState(false);
  const [displayData, setDisplayData] =
    useState<CharacterResponse>(initialData);

  const { data, isFetching, isError } = useSearchCharacterQuery(
    {
      name: searchTerm,
      pageNumber: page,
    },
    { skip: !hasSearched }
  );

  useEffect(() => {
    if (data) {
      setDisplayData(data);
    }
  }, [data]);

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
      setHasSearched(true);
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setSearchTerm(searchTerm);
      setPage(1);

      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      params.set(SEARCH_KEY, searchTerm);
      if (!searchTerm) {
        params.delete(SEARCH_KEY);
      }
      router.push(`?${params.toString()}`);
      setHasSearched(true);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col" data-testid="main-page">
      <div className="max-w pt-3">
        <SearchForm onSearch={handleSearch} />
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
        ) : displayData.characters.length === 0 ? (
          <MsgBlock
            title="No characters found 🕵️‍♀️"
            msg="Try adjusting your search, maybe a typo snuck in?"
          />
        ) : (
          <CharacterList characters={displayData.characters} />
        )}
        {children}
        <Flyout />
      </div>

      <div className="max-w pt-6 flex items-center justify-center relative">
        <Pagination
          page={page}
          onChange={handlePageChange}
          totalPages={displayData.page.totalPages ?? 1}
        />
      </div>
    </div>
  );
};
