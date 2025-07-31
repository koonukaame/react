import { useCallback, useEffect, useState } from 'react';
import { SearchForm, Pagination, Spinner } from '../../components';
import { CharacterList, searchCharacter, type Character } from '../../entities';
import { MsgBlock, SEARCH_KEY } from '../../shared';
import { useLocalStorage } from '../../shared';
import { Outlet, useSearchParams } from 'react-router';

export function Main() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page') ?? '';
  const [page, setPage] = useState<number>(() =>
    isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)
  );
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [chars, setChars] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_KEY);

  const fetchChars = useCallback(
    async (name: string, page: number) => {
      setIsLoading(true);
      const result = await searchCharacter(name, page);
      setIsLoading(false);

      if (result.ok) {
        const {
          characters,
          page: { totalPages, pageNumber },
        } = result;

        setChars(characters);

        setTotalPages(totalPages);
        const nextPage = Math.min(totalPages, pageNumber);
        setPage(nextPage);
        setSearchParams({
          page: nextPage.toString(),
        });
      } else {
        setHasError(true);
      }
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      setSearchParams({
        page: page.toString(),
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    fetchChars(searchTerm, page);
  }, [searchTerm, page]);

  return (
    <main
      className="flex flex-col min-h-screen max-w overflow-hidden"
      data-testid="main-page"
    >
      <div className="max-w pt-6">
        <SearchForm onSearch={setSearchTerm} />
      </div>
      <div className="max-h-[80vh] flex flex-row flex-grow pt-6 overflow-hidden">
        {isLoading ? (
          <Spinner isFullScreen />
        ) : hasError ? (
          <MsgBlock
            title="An unexpected error has occured"
            msg="Try again in a bit!"
          />
        ) : chars.length === 0 ? (
          <MsgBlock
            title="No characters found 🕵️‍♀️"
            msg="Try adjusting your search, maybe a typo snuck in?"
          />
        ) : (
          <CharacterList characters={chars} />
        )}
        <Outlet />
      </div>

      <div className="max-w pt-6 flex items-center justify-center relative">
        <Pagination
          page={page}
          onChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
