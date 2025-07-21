import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchForm } from '../SearchForm';
import { SEARCH_KEY } from '../../shared';

describe('SearchForm component', () => {
  const mockSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockSearch.mockClear();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      render(<SearchForm onSearch={mockSearch} />);

      const searchInput = screen.getByTestId('search-input');
      const searchBtn = screen.getByTestId('search-button');
      expect(searchInput).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
    });

    it('shows empty input when no saved term exists', () => {
      render(<SearchForm onSearch={mockSearch} />);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toHaveValue('');
    });
  });

  describe('User Interaction Tests', () => {
    it('updates input value when user types', () => {
      render(<SearchForm onSearch={mockSearch} />);

      const searchInput = screen.getByTestId('search-input');

      fireEvent.change(searchInput, { target: { value: 'Xyz' } });

      expect(searchInput).toHaveValue('Xyz');
    });

    it('saves search term to localStorage when search button is clicked', () => {
      render(<SearchForm onSearch={mockSearch} />);

      const searchInput = screen.getByTestId('search-input');
      const searchBtn = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: 'Zyx' } });
      fireEvent.click(searchBtn);

      expect(localStorage.getItem(SEARCH_KEY)).toBe('Zyx');
    });
  });

  describe('LocalStorage Integration', () => {
    it('overwrites existing localStorage value when new search is performed & trims whitespaces', () => {
      localStorage.setItem(SEARCH_KEY, 'old');

      render(<SearchForm onSearch={mockSearch} />);

      const searchInput = screen.getByTestId('search-input');
      const searchBtn = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: '  new  ' } });
      fireEvent.click(searchBtn);

      const formData = new FormData();
      formData.set('name', 'new');
      expect(mockSearch).toHaveBeenCalledWith(formData);
      expect(mockSearch).toHaveBeenCalledTimes(1);

      expect(localStorage.getItem(SEARCH_KEY)).toBe('new');
    });
  });
});
