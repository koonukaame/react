import { describe, expect, it } from 'vitest';
import { calculatePasswordStrength } from './calculatePasswordStrength';

describe('calculatePasswordStrength', () => {
  it('returns "none" for empty password', () => {
    expect(calculatePasswordStrength('')).toBe('none');
  });

  it('returns "weak" for passwords with score <= 2', () => {
    expect(calculatePasswordStrength('1')).toBe('weak');
    expect(calculatePasswordStrength('1A')).toBe('weak');
  });

  it('returns "medium" for passwords with score 3-4', () => {
    expect(calculatePasswordStrength('1Aa')).toBe('medium');
    expect(calculatePasswordStrength('1Aa!')).toBe('medium');
    expect(calculatePasswordStrength('1Aa!a')).toBe('medium');
  });

  it('returns "strong" for passwords with score 5', () => {
    expect(calculatePasswordStrength('1Aa!aa')).toBe('strong');
  });
});
