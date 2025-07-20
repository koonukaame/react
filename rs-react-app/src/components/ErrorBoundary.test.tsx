import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

describe('CharsResults component', () => {
  it('displays fallback UI on error', () => {
    const ErrorComponent = () => {
      throw new Error('error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const errorText = screen.getByTestId('render-error-text');
    const resetErrorBtn = screen.getByTestId('reset-error-btn');

    expect(errorText).toBeInTheDocument();
    expect(resetErrorBtn).toBeInTheDocument();
  });

  it('displays correct UI', () => {
    const AppComponent = () => {
      return <h1 data-testid="test-component">App component</h1>;
    };

    render(
      <ErrorBoundary>
        <AppComponent />
      </ErrorBoundary>
    );

    const app = screen.getByTestId('test-component');
    expect(app).toBeInTheDocument();
  });

  it('removes fallback UI on reset button click', () => {
    const ErrorComponent = () => {
      throw new Error('error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const resetErrorBtn = screen.getByTestId('reset-error-btn');
    const errorText = screen.getByTestId('render-error-text');

    fireEvent.click(resetErrorBtn);

    expect(errorText).not.toBeInTheDocument();
    expect(resetErrorBtn).not.toBeInTheDocument();
  });
});
