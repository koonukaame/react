import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ErrorBtn } from './ErrorBtn';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

describe('ErrorBtn component', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<ErrorBtn />);

      const errorButton = screen.getByTestId('error-button');
      expect(errorButton).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('throws error when is clicked', () => {
      const errorOnClick = () => {
        render(<ErrorBtn />);
        const errorButton = screen.getByTestId('error-button');
        fireEvent.click(errorButton);
      };

      expect(errorOnClick).toThrow('test');
    });

    it('triggers error boundary fallback UI', () => {
      const errorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

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

      errorMock.mockRestore();
    });
  });
});
