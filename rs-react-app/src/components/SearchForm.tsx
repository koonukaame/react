import { Component, type ChangeEvent, type ReactNode } from 'react';

type Props = {
  onSearch: (data: FormData) => void;
};

type State = {
  input: string;
};

const searchKey = 'search';

export class SearchForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this._onSearch = props.onSearch;
    this._onChange = this._onChange.bind(this);

    const initInputValue = localStorage.getItem(searchKey) ?? '';

    this.state = {
      input: initInputValue,
    };
  }

  render(): ReactNode {
    return (
      <form action={this._onSearch}>
        <input
          value={this.state.input}
          onChange={this._onChange}
          name="name"
          type="search"
        />
        <button type="submit">Поиск</button>
      </form>
    );
  }

  private _onSearch: Props['onSearch'] = () => {};
  private _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(searchKey, e.target.value);

    this.setState({
      input: e.target.value,
    });
  };
}
