'use client';

import { ReactNode, useCallback, useState } from 'react';
import {
  CharacterList,
  startrackApi,
  useSearchCharacterQuery,
} from '../../src/entities';
import { Pagination, SearchForm, Spinner } from '../../src/components';
import { SEARCH_KEY, Button, MsgBlock } from '../../src/shared';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

type Props = {
  children: ReactNode;
};

export default function CharacterLayout({ children }: Props) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get('page') ?? '';
  const searchParam = searchParams.get(SEARCH_KEY) ?? '';
  const [page, setPage] = useState<number>(() =>
    isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)
  );
  const [searchTerm, setSearchTerm] = useState(searchParam);

  const { data, isFetching, isError, isSuccess } = useSearchCharacterQuery({
    name: searchTerm,
    pageNumber: page,
  });

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
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
}
