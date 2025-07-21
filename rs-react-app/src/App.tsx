import { Component, type ReactNode } from 'react';
import { searchCharacter } from './services';
import type { Character } from './entities';
import { SearchForm, Spinner, ErrorBtn, ResultDisplay } from './components';
import { CharactersContext } from './features';
import { SEARCH_KEY } from './shared';

type Props = object;

type State = {
  characters: Character[];
  isLoading: boolean;
  hasError: boolean;
};

export class App extends Component<Props, State> {
  state: State = {
    characters: [],
    isLoading: false,
    hasError: false,
  };

  constructor(props: Props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
  }

  componentDidMount(): void {
    const searchTerm = localStorage.getItem(SEARCH_KEY) ?? '';
    const formData = new FormData();
    formData.set('name', searchTerm);

    this._handleSearch(formData);
  }

  render(): ReactNode {
    return (
      <CharactersContext.Provider
        value={{
          characters: this.state.characters,
        }}
      >
        <header className="max-w-5xl p-6 mx-auto" data-testid="header">
          <SearchForm onSearch={this._handleSearch} />
        </header>
        <main
          className="max-w-5xl p-6 bg-rose-50 rounded-2xl shadow-lg mx-auto my-10"
          data-testid="main"
        >
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <ResultDisplay hasError={this.state.hasError} />
          )}
          <ErrorBtn />
        </main>
      </CharactersContext.Provider>
    );
  }

  private async _handleSearch(formData: FormData) {
    this.setState({
      isLoading: true,
      characters: [],
    });

    try {
      const { characters } = await searchCharacter(formData);

      this.setState({
        characters,
        hasError: false,
      });
    } catch (err) {
      this.setState({
        hasError: true,
      });
      console.error(`${err}`);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
}
