import { expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { mockChars } from '@test';
import '@testing-library/jest-dom';
import { CharacterDetails } from './CharacterDetails';

it('renders without errors', () => {
  const mockChar = mockChars[0];

  render(
    <MemoryRouter>
      <CharacterDetails character={mockChar} />
    </MemoryRouter>
  );

  const characterDetails = screen.getByTestId('character-details');
  expect(characterDetails).toBeInTheDocument();
});
