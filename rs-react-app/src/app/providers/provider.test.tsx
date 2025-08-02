import { expect, it } from 'vitest';
import { MainProviders } from './provider';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

it('Provider renders children correctly', () => {
  render(
    <MainProviders>
      <div data-testid="child"></div>
    </MainProviders>
  );

  expect(screen.getByTestId('child')).toBeInTheDocument();
});
