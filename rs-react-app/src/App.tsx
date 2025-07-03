import { Component, type ReactNode } from 'react';
import { searchCharacter } from './services/startrack';
import type { Character } from './entities';
import { SearchForm } from './components';
import { CharsTable } from './components';
import { Spinner } from './components/Spinner';

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
      <section>
        <Spinner />
        <SearchForm onSearch={this._handleSearch} />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <CharsTable items={this.state.characters} />
        )}
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
