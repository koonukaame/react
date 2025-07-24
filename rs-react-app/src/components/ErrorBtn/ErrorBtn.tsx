import { Component } from 'react';

type Props = object;

type State = {
  hasError: boolean;
};

export class ErrorBtn extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  constructor(props: Props) {
    super(props);
    this._setError = this._setError.bind(this);
  }

  render() {
    if (this.state.hasError) {
      throw new Error('test');
    }

    return (
      <button
        className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2 mt-2 rounded-full shadow transition"
        onClick={this._setError}
        data-testid="error-button"
      >
        Show error
      </button>
    );
  }

  private _setError() {
    this.setState({ hasError: true });
  }
}
