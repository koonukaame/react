import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { searchCharacter } from './services';

vi.mock('./services', () => ({
  searchCharacter: vi.fn(),
}));

describe('App component', () => {
  describe('Rendering', () => {
    it('renders header and main', async () => {
      const mockedSearchCharacter = vi.mocked(searchCharacter);
      mockedSearchCharacter.mockResolvedValue({ characters: [] });

      await waitFor(() => {
        render(<App />);
      });

      const header = screen.getByTestId('header');
      const main = screen.getByTestId('main');

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
    });
  });
});
