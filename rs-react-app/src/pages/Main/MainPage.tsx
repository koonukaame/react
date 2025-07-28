import { useCallback, useEffect, useState } from 'react';
import {
  SearchForm,
  ItemDetails,
  Pagination,
  RedirectBtn,
} from '../../components';
import type { Character, Page } from '../../entities';
import { searchCharacter, getCharacter } from '../../services';
import { PAGE_OFFSET, SEARCH_KEY } from '../../shared';
import { CharactersContext } from '../../features';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';

export function Main() {
  const [chars, setChars] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<Page>();
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const { uid: uidParam } = useParams();
  const navigate = useNavigate();

  const fetchChars = useCallback(async (formData: FormData, pageNumber = 0) => {
    setIsLoading(true);
    try {
      const { characters, page } = await searchCharacter(formData, pageNumber);

      setChars(characters);
      setPage(page);
      setHasError(false);
    } catch (err) {
      setHasError(true);
      console.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchChar = useCallback(async (uid: string) => {
    setIsLoading(true);

    try {
      const { character } = await getCharacter(uid);
      setSelectedChar(character);
    } catch (err) {
      console.error(`${err}`);
      setSelectedChar(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const _handleSearch = useCallback(
    async (formData: FormData, pageNumber = 0) => {
      fetchChars(formData, pageNumber);
      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set('page', String(pageNumber + PAGE_OFFSET));
        return newParams;
      });
    },
    [setSearchParams, fetchChars]
  );

  const _handleCharClick = useCallback(
    (uid: string) => {
      navigate({
        pathname: `/character/${uid}`,
        search: searchParams.toString(),
      });
    },
    [navigate, searchParams]
  );

  const _handleCharClose = useCallback(() => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  }, [navigate, searchParams]);

  useEffect(() => {
    const currentPage = Number(pageParam);
    const pageNumber = isNaN(currentPage) ? 0 : Math.max(0, currentPage - 1);

    const formData = new FormData();
    formData.set('name', localStorage.getItem(SEARCH_KEY) ?? '');
    formData.set('pageNumber', pageNumber.toString());

    fetchChars(formData, pageNumber);
  }, [pageParam, fetchChars]);

  useEffect(() => {
    if (!page) {
      return;
    }

    const currentPage = Number(pageParam);
    const min = 1;
    const max = page.totalPages;

    if (max === 0) {
      return;
    }

    const isInvalid =
      isNaN(currentPage) || currentPage < min || currentPage > max;

    if (isInvalid) {
      const validPage = currentPage >= min && !isNaN(currentPage) ? max : min;

      setSearchParams((params) => {
        const newParams = new URLSearchParams(params);
        newParams.set('page', String(validPage));
        return newParams;
      });
    }
  }, [page, pageParam, setSearchParams]);

  useEffect(() => {
    if (uidParam) {
      fetchChar(uidParam);
    } else {
      setSelectedChar(null);
    }
  }, [uidParam, fetchChar]);

  return (
    <CharactersContext.Provider
      value={{ characters: chars, setSelectedChar: _handleCharClick }}
    >
      <div
        className="flex flex-col min-h-screen max-w overflow-hidden"
        data-testid="main-page"
      >
        <header className="max-w px-6 pt-6">
          <SearchForm onSearch={_handleSearch} />
        </header>
        <main className="max-h-[80vh] flex flex-row flex-grow p-6 rounded-2xl shadow-lg overflow-hidden">
          <Outlet context={{ isLoading, hasError }} />
          <ItemDetails
            character={selectedChar ?? null}
            _onClick={_handleCharClose}
          />
        </main>
        <footer className="max-w p-6 flex items-center justify-center relative">
          {page && <Pagination page={page} onSearch={_handleSearch} />}
          <div className="absolute right-6">
            <RedirectBtn url="/about" locationText="About" />
          </div>
        </footer>
      </div>
    </CharactersContext.Provider>
  );
}
