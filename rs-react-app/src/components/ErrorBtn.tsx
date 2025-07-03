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

    return <button onClick={this._setError}>Showw error</button>;
  }

  private _setError() {
    this.setState({ isError: true });
  }
}
