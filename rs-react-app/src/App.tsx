import { Component, type ReactNode } from 'react';
import { searchConflict } from './services/startrack';
import type { Character } from './entities';
import { SearchForm } from './components';
import { CharsTable } from './components';

type Props = object;

type State = { characters: Character[] };

export class App extends Component<Props, State> {
  state: State = {
    characters: [],
  };

  constructor(props: Props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
  }

  render(): ReactNode {
    return (
      <section>
        <SearchForm onSearch={this._handleSearch} />
        <CharsTable items={this.state.characters} />
      </section>
    );
  }

  private async _handleSearch(formData: FormData) {
    const { characters } = await searchConflict(formData);
    console.log('Received chars:', characters);

    this.setState({
      characters,
    });
  }
}
