import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { getCharacter } from './character-get';
import { mockChars } from '../../../../test-utils';

describe('searchCharacter function', () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  describe('Mocked API Calls', () => {
    const mockChar = mockChars[0];
    it('returns character on successful scenario', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ character: mockChar }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const uid = mockChar.uid;
      const result = await getCharacter(uid);

      expect(result).toEqual({ character: mockChar });
    });

    it('throws an error on error scenario', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };
      mockFetch.mockResolvedValue(mockResponse);

      const uid = mockChar.uid;

      await expect(getCharacter(uid)).rejects.toThrow(
        'Api error response 404 Not Found'
      );
    });
  });
});
