import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockChars } from '../../test-utils';
import '@testing-library/jest-dom';
import { createRoutesStub } from 'react-router';
import { getCharacter } from '../../entities';
import { CharacterWidget } from './CharacterWidget';

vi.mock('../../entities', async () => {
  const originalModule = await vi.importActual('../../entities');
  return {
    ...originalModule,
    // searchCharacter: vi.fn(),
    getCharacter: vi.fn(),
  };
});

describe('CharacterWidget', () => {
  const mockChar = mockChars[0];
  describe('Rendering', () => {
    it('shows spinner and then character details', async () => {
      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockResolvedValue({ character: mockChar, ok: true });

      const Stub = createRoutesStub([
        {
          path: '/:uid',
          Component: CharacterWidget,
        },
      ]);

      render(<Stub initialEntries={[`/${mockChar.uid}`]} />);

      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();

      await waitFor(() => {
        const itemDetails = screen.getByTestId('item-details');
        expect(itemDetails).toBeInTheDocument();
      });
    });

    it('does not render character when getCharacter returns error', async () => {
      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockResolvedValue({ message: 'api error', ok: false });

      const Stub = createRoutesStub([
        {
          path: '/:uid',
          Component: CharacterWidget,
        },
      ]);

      render(<Stub initialEntries={[`/${mockChar.uid}`]} />);

      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();

      await waitFor(() => {
        const itemDetails = screen.queryByTestId('item-details');
        expect(itemDetails).not.toBeInTheDocument();
      });
    });

    it('does not render character details if uid is not set', async () => {
      const mockedGetCharacter = vi.mocked(getCharacter);
      mockedGetCharacter.mockResolvedValue({
        character: mockChar,
        ok: true,
      });

      const Stub = createRoutesStub([
        {
          path: '/',
          Component: CharacterWidget,
        },
        {
          path: '/:uid',
          Component: CharacterWidget,
        },
      ]);

      render(<Stub initialEntries={['/']} />);

      await waitFor(() => {
        const itemDetails = screen.queryByTestId('item-details');
        const spinner = screen.queryByTestId('spinner');
        expect(itemDetails).not.toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
      });
    });
  });
});
