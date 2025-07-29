import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { searchCharacter } from './character-search';
import { mockChars } from '../../../../test-utils';

describe('searchCharacter function', () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  describe('Mocked API Calls', () => {
    it('returns characters on successful scenario', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ characters: mockChars }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('name', 'Ggg');

      const result = await searchCharacter(formData, 0);

      expect(result).toEqual({ characters: mockChars });
    });

    it('throws an error on error scenario', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };
      mockFetch.mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('name', 'Fff');

      await expect(searchCharacter(formData, 0)).rejects.toThrow(
        'Api error response 404 Not Found'
      );
    });
  });
});
