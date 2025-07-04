import { Component } from 'react';

type Props = object;

type State = {
  isError: boolean;
};

export class ErrorBtn extends Component<Props, State> {
  state: State = {
    isError: false,
  };

  constructor(props: Props) {
    super(props);
    this._setError = this._setError.bind(this);
  }

  render() {
    if (this.state.isError) {
      throw new Error('test');
    }

    return (
      <button
        className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2 rounded-full shadow transition"
        onClick={this._setError}
      >
        Show error
      </button>
    );
  }

  private _setError() {
    this.setState({ isError: true });
  }
}
