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

  componentDidMount(): void {
    const formData = new FormData();
    formData.set('name', this.state.input);

    this._onSearch(formData);
  }

  render(): ReactNode {
    return (
      <form
        onSubmit={this._onSubmit}
        className="flex items-center justify-center gap-3"
      >
        <input
          value={this.state.input}
          onChange={this._onChange}
          name="name"
          type="search"
          placeholder="Who are you looking for?"
          data-testid="search-input"
          className="flex-1 px-4 py-2 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2 rounded-full shadow transition"
        >
          Search
        </button>
      </form>
    );
  }

  private _onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({ input: this.state.input.trim() });

    const formData = new FormData(event.currentTarget);
    formData.set('name', this.state.input);

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
