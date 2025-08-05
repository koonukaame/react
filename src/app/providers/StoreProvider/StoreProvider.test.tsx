import { expect, it } from 'vitest';
import { StoreProvider } from './StoreProvider';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

it('Provider renders children correctly', () => {
  render(
    <StoreProvider>
      <div data-testid="child"></div>
    </StoreProvider>
  );

  expect(screen.getByTestId('child')).toBeInTheDocument();
});
