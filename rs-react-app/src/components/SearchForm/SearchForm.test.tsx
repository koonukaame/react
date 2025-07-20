import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchForm } from './SearchForm';

describe('SearchForm component', () => {
  const mockSearch = vi.fn();
  const searchKey = 'search';

  beforeEach(() => {
    localStorage.clear();
    // render(<SearchForm onSearch={mockSearch} />);
  });

  it('renders search input and search button', () => {
    render(<SearchForm onSearch={mockSearch} />);

    const searchInput = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('search-button');
    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem(searchKey, 'Zzz');

    render(<SearchForm onSearch={mockSearch} />);

    expect(screen.getByDisplayValue('Zzz')).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    render(<SearchForm onSearch={mockSearch} />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('');
  });

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

    expect(localStorage.getItem(searchKey)).toBe('Zyx');
  });

  it('retrieves saved search term on component mount', () => {
    localStorage.setItem(searchKey, 'Nnn');

    render(<SearchForm onSearch={mockSearch} />);

    const searchInput = screen.getByDisplayValue('Nnn');
    expect(searchInput).toBeInTheDocument();
  });

  it('overwrites existing localStorage value when new search is performed', () => {
    localStorage.setItem(searchKey, 'new');

    render(<SearchForm onSearch={mockSearch} />);

    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'new' } });

    expect(localStorage.getItem(searchKey)).toBe('new');
  });
});
