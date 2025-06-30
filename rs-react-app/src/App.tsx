import { Component, type ReactNode } from 'react';
import { searchConflict } from './services/startrack';
import type { Conflict } from './entities';
import { SearchForm } from './components';

type Props = object;

type State = { conflicts: Conflict[] };

export class App extends Component<Props, State> {
  state: State = {
    conflicts: [],
  };

  constructor(props: Props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
  }

  render(): ReactNode {
    return (
      <section>
        <SearchForm onSearch={this._handleSearch} />

        <ul>
          {this.state.conflicts.map((conflict) => (
            <li key={conflict.uid}>
              {conflict.uid} {conflict.name}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  private async _handleSearch(formData: FormData) {
    const { conflicts } = await searchConflict(formData);

    this.setState({
      conflicts,
    });
  }
}
