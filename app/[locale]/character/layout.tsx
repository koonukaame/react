'use client';

import { ReactNode, useCallback, useState } from 'react';
import {
  CharacterList,
  startrackApi,
  useSearchCharacterQuery,
} from '../../../src/entities';
import { Pagination, SearchForm, Spinner } from '../../../src/components';
import { SEARCH_KEY, Button, MsgBlock } from '../../../src/shared';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n';

type Props = {
  children: ReactNode;
};

export default function CharacterLayout({ children }: Props) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('main');
  const tError = useTranslations('msgBlock.listMsgs.error');
  const tNotFound = useTranslations('msgBlock.listMsgs.notFound');

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
    <div className="flex flex-col">
      <div className="max-w pt-3">
        <SearchForm onSearch={handleSearch} />
        <div className="flex mt-3 gap-3">
          <Button
            onClick={() =>
              dispatch(startrackApi.util.invalidateTags(['searchCharacter']))
            }
          >
            {t('refetchList')}
          </Button>
          <Button
            onClick={() =>
              dispatch(startrackApi.util.invalidateTags(['getCharacter']))
            }
          >
            {t('refetchDetails')}
          </Button>
        </div>
      </div>
      <div className="h-[60vh] flex flex-row flex-grow mt-3 overflow-hidden">
        {isFetching ? (
          <Spinner isFullScreen />
        ) : isError ? (
          <MsgBlock title={tError('title')} msg={tError('msg')} />
        ) : isSuccess && data.characters.length === 0 ? (
          <MsgBlock title={tNotFound('title')} msg={tNotFound('msg')} />
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
