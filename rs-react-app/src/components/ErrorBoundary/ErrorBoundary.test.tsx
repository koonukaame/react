import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockInstance,
  afterEach,
} from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

describe('CharsResults component', () => {
  let errorMock: MockInstance;

  beforeEach(() => {
    errorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorMock.mockRestore();
  });

  describe('Error Catching', () => {
    it('displays fallback UI on error', () => {
      const ErrorComponent = () => {
        throw new Error('error');
      };

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      const errorBoundary = screen.getByTestId('error-boundary');
      expect(errorBoundary).toBeInTheDocument();
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
      const errorBoundary = screen.getByTestId('error-boundary');

      fireEvent.click(resetErrorBtn);

      expect(errorBoundary).not.toBeInTheDocument();
      expect(resetErrorBtn).not.toBeInTheDocument();
    });
  });
});
