import { useCallback, useEffect, useState } from 'react';
import { searchCharacter } from './services';
import type { Character } from './entities';
import { SearchForm, Spinner, ErrorBtn, ResultDisplay } from './components';
import { CharactersContext } from './features';

export function App() {
  const [chars, setChars] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const _handleSearch = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setChars([]);
    try {
      const { characters } = await searchCharacter(formData);

      setChars(characters);
      setHasError(false);
    } catch (err) {
      setHasError(true);
      console.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchTerm = localStorage.getItem('search') ?? '';
    const formData = new FormData();
    formData.set('name', searchTerm);
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
        {isLoading ? <Spinner /> : <ResultDisplay hasError={hasError} />}
        <ErrorBtn />
      </main>
    </CharactersContext.Provider>
  );
}
