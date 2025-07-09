import { Component, type ReactNode } from 'react';
import { searchCharacter } from './services';
import type { Character } from './entities';
import { SearchForm, Spinner, ErrorBtn, ResultDisplay } from './components';
import { CharactersContext } from './features';

type Props = object;

type State = {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
};

export class App extends Component<Props, State> {
  state: State = {
    characters: [],
    isLoading: false,
    isError: false,
  };

  constructor(props: Props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
  }

  render(): ReactNode {
    return (
      <CharactersContext.Provider
        value={{
          characters: this.state.characters,
        }}
      >
        <header className="max-w-5xl p-6 mx-auto">
          <SearchForm onSearch={this._handleSearch} />
        </header>
        <main className="max-w-5xl p-6 bg-rose-50 rounded-2xl shadow-lg mx-auto my-10">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <ResultDisplay isError={this.state.isError} />
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
        isError: false,
      });
    } catch (err) {
      this.setState({
        isError: true,
      });
      console.error(`${err}`);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
}
