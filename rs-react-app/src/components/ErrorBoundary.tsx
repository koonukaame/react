import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  isError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    isError: false,
  };

  static getDerivedStateFromError(): State {
    return { isError: true };
  }

  render(): ReactNode {
    if (this.state.isError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={this._resetError}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }

  private _resetError = () => {
    this.setState({ isError: false });
  };
}
