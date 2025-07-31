import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { getCharacter } from './get-character';
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

      expect(result).toEqual({ character: mockChar, ok: true });
    });

    it('throws an error on error scenario', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };
      mockFetch.mockResolvedValue(mockResponse);

      const uid = mockChar.uid;
      const result = await getCharacter(uid);

      expect(result).toEqual({
        message: `API failed with error ${mockResponse.status}: ${mockResponse.statusText}`,
        ok: false,
      });
    });

    it('returns error when data does not satisfy Character schema', async () => {
      const invalidCharData = {
        ...mockChar,
        name: null,
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ character: invalidCharData }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const uid = mockChar.uid;
      const result = await getCharacter(uid);

      expect(result).toEqual({
        message: "Response data don't satisfies Character schema",
        ok: false,
      });
    });

    describe('Fetch errors', () => {
      it('returns error message when fetch throws an error', async () => {
        const mockError = new Error('err');
        mockFetch.mockRejectedValue(mockError);

        const uid = mockChar.uid;
        const result = await getCharacter(uid);

        expect(result).toEqual({
          message: 'err',
          ok: false,
        });
      });

      it('returns "Unknown error" when fetch throws non-Error value', async () => {
        mockFetch.mockRejectedValue('dfgd');

        const uid = mockChar.uid;
        const result = await getCharacter(uid);

        expect(result).toEqual({
          message: 'Unknown error',
          ok: false,
        });
      });
    });
  });
});
