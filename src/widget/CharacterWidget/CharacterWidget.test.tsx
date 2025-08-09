import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockChars } from '@test';
import '@testing-library/jest-dom';
import { createRoutesStub } from 'react-router';
import { CharacterWidget } from './CharacterWidget';
import { useGetCharacterQuery } from '../../entities/character/api/startrack';

vi.mock('../../entities/character/api/startrack', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('../../entities/character/api/startrack')
    >();
  return {
    ...actual,
    useGetCharacterQuery: vi.fn(),
  };
});

describe('CharacterWidget', () => {
  const mockChar = mockChars[0];
  describe('Rendering', () => {
    it('renders MsgBlock component when getCharacter query returns error', async () => {
      vi.mocked(useGetCharacterQuery).mockReturnValue({
        data: null,
        isFetching: false,
        isError: true,
        refetch: vi.fn(),
      });

      const Stub = createRoutesStub([
        {
          path: '/character/:uid',
          Component: CharacterWidget,
        },
      ]);

      render(<Stub initialEntries={[`/character/${mockChar.uid}`]} />);

      await waitFor(() => {
        const msgBlock = screen.getByTestId('msg-block');
        expect(msgBlock).toBeInTheDocument();
      });
    });

    it('does not render character details if uid is not set', async () => {
      vi.mocked(useGetCharacterQuery).mockReturnValue({
        data: mockChar,
        isFetching: false,
        isError: false,
        refetch: vi.fn(),
      });

      const Stub = createRoutesStub([
        {
          path: '/character',
          Component: CharacterWidget,
        },
        {
          path: '/character/:uid',
          Component: CharacterWidget,
        },
      ]);

      render(<Stub initialEntries={['/character']} />);

      await waitFor(() => {
        const itemDetails = screen.queryByTestId('item-details');
        const spinner = screen.queryByTestId('spinner');
        expect(itemDetails).not.toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
      });
    });
  });
});
