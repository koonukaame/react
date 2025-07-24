import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ItemDetails } from './ItemDetails';
import { mockChars } from '../../test-utils';
import { CHAR_MAP } from '../../shared';
import '@testing-library/jest-dom';

describe('ItemDetails component', () => {
  const mockOnClick = vi.fn();

  describe('Rendering', () => {
    it('renders component with correct data if character is provided', () => {
      mockChars.map((char) => {
        cleanup();

        render(<ItemDetails character={char} _onClick={mockOnClick} />);

        for (const { title, dataToRender } of CHAR_MAP) {
          if (title !== 'Name') {
            const charMapTitle = screen.getByText(`${title}:`);
            if (char[dataToRender] !== null) {
              const charMapDataToRender = screen.getByText(
                char[dataToRender].toString()
              );

              expect(charMapTitle).toBeInTheDocument();
              expect(charMapDataToRender).toBeInTheDocument();
            }
          }

          const name = screen.getAllByText(char.name);
          expect(name).toHaveLength(2);
        }
      });
    });

    it('renders component with null field', () => {
      const mockUnknownChar = {
        uid: '3',
        name: 'Tt',
        gender: null,
        yearOfBirth: null,
        yearOfDeath: null,
        placeOfBirth: null,
        placeOfDeath: null,
        height: null,
        weight: null,
        deceased: null,
      };

      render(
        <ItemDetails character={mockUnknownChar} _onClick={mockOnClick} />
      );

      const unknownData = screen.getAllByText('Unknown');
      const unknownDataAmount = CHAR_MAP.reduce((acc, { dataToRender }) => {
        if (mockUnknownChar[dataToRender] == null) {
          return acc + 1;
        }
        return acc;
      }, 0);
      expect(unknownData.length).toBe(unknownDataAmount);
    });

    it('renders MsgBlock if no data is provided', () => {
      render(<ItemDetails character={null} _onClick={mockOnClick} />);
      const noCharTitle = screen.getByText('No chosen character');
      const noCharMsg = screen.getByText(
        'Please choose a character to learn more about them'
      );

      expect(noCharTitle).toBeInTheDocument();
      expect(noCharMsg).toBeInTheDocument();

      mockChars.map((char) => {
        for (const { title, dataToRender } of CHAR_MAP) {
          const charMapTitle = screen.queryByText(`${title}:`);

          if (char[dataToRender] !== null) {
            const charMapDataToRender = screen.queryByText(
              char[dataToRender].toString()
            );
            expect(charMapDataToRender).not.toBeInTheDocument();
          }

          expect(charMapTitle).not.toBeInTheDocument();
        }
      });
    });
  });
});
