import { useCallback, useEffect, useState } from 'react';
import { searchCharacter } from './services';
import type { Character, Page } from './entities';
import { SearchForm, ErrorBtn, ResultDisplay, Pagination } from './components';
import { CharactersContext } from './features';
import { SEARCH_KEY } from './shared';


export function App() {
  const [chars, setChars] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<Page>();

  const _handleSearch = useCallback(
    async (formData: FormData, pageNumber = 0) => {
      setIsLoading(true);
      setChars([]);
      try {
        const { characters, page } = await searchCharacter(
          formData,
          pageNumber
        );

        setChars(characters);
        setPage(page);
        setHasError(false);
      } catch (err) {
        setHasError(true);
        console.error(`${err}`);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const searchTerm = localStorage.getItem(SEARCH_KEY) ?? '';
    const formData = new FormData();
    formData.set('name', searchTerm);
    formData.set('pageNumber', '0');
    _handleSearch(formData);
  }, [_handleSearch]);

  return (
    <CharactersContext.Provider
      value={{
        characters: chars,
      }}
    >
      <header className="max-w-5xl p-6 mx-auto" data-testid="header">
        <SearchForm onSearch={_handleSearch} />
      </header>
      <main
        className="max-w-5xl p-6 bg-rose-50 rounded-2xl shadow-lg mx-auto my-10"
        data-testid="main"
      >
        <ResultDisplay hasError={hasError} isLoading={isLoading} />
        <ErrorBtn />
      </main>
      <footer className="max-w-5xl p-6 mx-auto">
        {page && <Pagination page={page} onSearch={_handleSearch} />}
      </footer>
    </CharactersContext.Provider>
  );
}
