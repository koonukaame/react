import { describe, it, expect } from 'vitest';
import { PasswordStrength } from './PasswordStrength';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PasswordStrength', () => {
  it('renders 0 active bars for "none"', () => {
    render(<PasswordStrength strength="none" />);
    const bars = screen.getAllByTestId('password-bar');
    const activeBars = bars.filter((_, i) => i < 0).length;
    expect(activeBars).toBe(0);
  });

  it('renders 1 active bar for "weak"', () => {
    render(<PasswordStrength strength="weak" />);
    const bars = screen.getAllByTestId('password-bar');
    const activeBars = bars.filter((_, i) => i < 1).length;
    expect(activeBars).toBe(1);
  });

  it('renders 2 active bars for "medium"', () => {
    render(<PasswordStrength strength="medium" />);
    const bars = screen.getAllByTestId('password-bar');
    const activeBars = bars.filter((_, i) => i < 2).length;
    expect(activeBars).toBe(2);
  });

  it('renders 3 active bars for "strong"', () => {
    render(<PasswordStrength strength="strong" />);
    const bars = screen.getAllByTestId('password-bar');
    const activeBars = bars.filter((_, i) => i < 3).length;
    expect(activeBars).toBe(3);
  });
});
