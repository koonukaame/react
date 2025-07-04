import { Component, type ReactNode } from 'react';
import { searchCharacter } from './services/startrack';
import type { Character } from './entities';
import { SearchForm, CharsResult, Spinner, ErrorBtn } from './components';

type Props = object;

type State = {
  characters: Character[];
  isLoading: boolean;
};

export class App extends Component<Props, State> {
  state: State = {
    characters: [],
    isLoading: false,
  };

  constructor(props: Props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
  }

  render(): ReactNode {
    return (
      <section className="max-w-3xl p-6 bg-rose-50 rounded-2xl shadow-lg mx-auto m-10">
        <SearchForm onSearch={this._handleSearch} />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <CharsResult characters={this.state.characters} />
        )}
        <ErrorBtn />
      </section>
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
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
}
