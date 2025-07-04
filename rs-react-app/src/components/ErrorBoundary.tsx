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
        <div className="flex flex-col gap-4 items-center justify-center h-[60vh] text-center p-6">
          <span className="text-2xl font-bold text-rose-700">
            Click the button bellow to return back✨
          </span>
          <button
            className="bg-rose-100 text-rose-700 hover:bg-rose-200 font-medium px-6 py-2 rounded-full shadow transition"
            onClick={this._resetError}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }

  private _resetError = () => {
    this.setState({ isError: false });
  };
}
