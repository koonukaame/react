import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { searchCharacter } from './search-character';
import { mockChars } from '@test';

describe('searchCharacter function', () => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;

  const mockPage = {
    pageNumber: 1,
    pageSize: 10,
    numberOfElements: mockChars.length,
    totalElements: 20,
    totalPages: 2,
    firstPage: true,
    lastPage: false,
  };

  describe('Mocked API Calls', () => {
    const mockResponseData = {
      characters: mockChars,
      page: mockPage,
    };

    it('returns characters on successful scenario', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponseData),
      };
      mockFetch.mockResolvedValue(mockResponse);
      const result = await searchCharacter('Ggg', 1);

      expect(result).toEqual({
        characters: mockChars,
        page: {
          ...mockPage,
          pageNumber: mockPage.pageNumber + 1,
        },
        ok: true,
      });
    });

    it('throws an error on error scenario', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: vi.fn().mockResolvedValue(mockResponseData),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await searchCharacter('Fff', 1);

      expect(result).toEqual({
        message: `API failed with error ${mockResponse.status}: ${mockResponse.statusText}`,
        ok: false,
      });
    });

    it('returns error when data does not satisfy Character schema', async () => {
      const invalidMockResponseData = {
        characters: mockChars,
        page: {
          ...mockPage,
          firstPage: 10,
        },
      };

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ character: invalidMockResponseData }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await searchCharacter('Fff', 1);

      expect(result).toEqual({
        message: 'Response data do not satisfies CharacterResponse schema',
        ok: false,
      });
    });

    describe('Fetch errors', () => {
      it('returns error message when fetch throws an error', async () => {
        const mockError = new Error('err');
        mockFetch.mockRejectedValue(mockError);

        const result = await searchCharacter('Fff', 1);

        expect(result).toEqual({
          message: 'err',
          ok: false,
        });
      });

      it('returns "Unknown error" when fetch throws non-Error value', async () => {
        mockFetch.mockRejectedValue('dfgd');

        const result = await searchCharacter('Fff', 1);

        expect(result).toEqual({
          message: 'Unknown error',
          ok: false,
        });
      });
    });
  });
});
