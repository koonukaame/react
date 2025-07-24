import { useCallback, useEffect, useState } from 'react';
import {
  SearchForm,
  ResultDisplay,
  ItemDetails,
  Pagination,
} from '../../components';
import type { Character, Page } from '../../entities';
import { searchCharacter, getCharacter } from '../../services';
import { SEARCH_KEY } from '../../shared';
import { CharactersContext } from '../../features';

export function Main() {
  const [chars, setChars] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<Page>();
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const _handleSearch = useCallback(
    async (formData: FormData, pageNumber = 0) => {
      setIsLoading(true);
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

  const _handleCharClick = useCallback(async (uid: string) => {
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
        setSelectedChar: _handleCharClick,
      }}
    >
      <div className="flex flex-col min-h-screen max-w overflow-hidden">
        <header className="max-w px-6 pt-6" data-testid="header">
          <SearchForm onSearch={_handleSearch} />
        </header>
        <main
          className="flex flex-grow p-6 rounded-2xl shadow-lg my-10"
          data-testid="main"
        >
          <ResultDisplay hasError={hasError} isLoading={isLoading} />
          <ItemDetails
            character={selectedChar}
            _onClick={() => setSelectedChar(null)}
          />
        </main>
        <footer className="max-w p-6">
          {page && <Pagination page={page} onSearch={_handleSearch} />}
        </footer>
      </div>
    </CharactersContext.Provider>
  );
}
