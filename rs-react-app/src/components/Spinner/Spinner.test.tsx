import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { it, expect } from 'vitest';
import { Spinner } from './Spinner';

it('Spinner component renders without errors', () => {
  render(<Spinner isFullScreen />);
  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeInTheDocument();
});
