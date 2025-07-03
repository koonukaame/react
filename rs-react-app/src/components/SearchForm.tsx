import {
  Component,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';

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
    this._onSubmit = this._onSubmit.bind(this);

    const initInputValue = localStorage.getItem(searchKey) ?? '';

    this.state = {
      input: initInputValue,
    };
  }

  render(): ReactNode {
    return (
      <form onSubmit={this._onSubmit}>
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

  private _onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    this._onSearch(formData);
  }

  private _onChange(e: ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(searchKey, e.target.value);

    this.setState({
      input: e.target.value,
    });
  }

  private _onSearch: Props['onSearch'];
}
