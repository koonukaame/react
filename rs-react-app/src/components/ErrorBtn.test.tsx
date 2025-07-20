import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { ErrorBtn } from './ErrorBtn';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBtn component', () => {
  it('renders without errors', () => {
    render(<ErrorBtn />);

    const errorButton = screen.getByTestId('error-button');
    expect(errorButton).toBeInTheDocument();
  });

  it('throws error when is clicked', () => {
    const errorOnClick = () => {
      render(<ErrorBtn />);
      const errorButton = screen.getByTestId('error-button');
      fireEvent.click(errorButton);
    };

    expect(errorOnClick).toThrow('test');
  });

  it('triggers error boundary fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorBtn />
      </ErrorBoundary>
    );

    const errorButton = screen.getByTestId('error-button');

    fireEvent.click(errorButton);

    const errorText = screen.getByTestId('render-error-text');
    const resetErrorBtn = screen.getByTestId('reset-error-btn');

    expect(errorText).toBeInTheDocument();
    expect(resetErrorBtn).toBeInTheDocument();
  });
});
