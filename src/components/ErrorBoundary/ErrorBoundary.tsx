'use client';

import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col gap-4 items-center justify-center h-[60vh] text-center p-6"
          data-testid="error-boundary"
        >
          <span className="text-2xl font-bold text-rose-700">
            Click the button below to return back✨
          </span>
          <button
            className="bg-rose-100 text-rose-700 hover:bg-rose-200 font-medium px-6 py-2 rounded-full shadow transition cursor-pointer"
            onClick={this._resetError}
            data-testid="reset-error-btn"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }

  private _resetError = () => {
    this.setState({ hasError: false });
  };
}
