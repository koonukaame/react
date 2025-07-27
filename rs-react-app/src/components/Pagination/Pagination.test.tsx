import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import type { Page } from '../../entities';
import { PAGE_OFFSET, SEARCH_KEY } from '../../shared';

describe('Pagination component', () => {
  const mockPage: Page = {
    pageNumber: 4,
    totalPages: 6,
    firstPage: false,
    lastPage: false,
    pageSize: 50,
    numberOfElements: 10,
    totalElements: 230,
  };

  const mockOnSearch = vi.fn();
  it('renders without errors', () => {
    render(<Pagination page={mockPage} onSearch={mockOnSearch} />);

    const page = screen.getByTestId('pagination');

    expect(page).toBeInTheDocument();
  });

  describe('Page Display', () => {
    it('shows correct current page and total pages', () => {
      render(<Pagination page={mockPage} onSearch={mockOnSearch} />);
      const page = screen.getByText(
        `${mockPage.pageNumber + PAGE_OFFSET} / ${mockPage.totalPages}`
      );
      expect(page).toBeInTheDocument();
    });

    it('shows only one page if the total page count is zero', () => {
      const mockEmptyPage = {
        pageNumber: 0,
        totalPages: 0,
        firstPage: true,
        lastPage: false,
        pageSize: 50,
        numberOfElements: 10,
        totalElements: 10,
      };
      render(<Pagination page={mockEmptyPage} onSearch={mockOnSearch} />);

      const page = screen.getByText(mockEmptyPage.pageNumber + PAGE_OFFSET);
      const wrongPage = screen.queryByText(
        `${mockEmptyPage.pageNumber + PAGE_OFFSET} / ${mockEmptyPage.totalPages}`
      );
      expect(page).toBeInTheDocument();
      expect(wrongPage).not.toBeInTheDocument();
    });
  });

  describe('Buttons Behaviour', () => {
    it('previous button is disabled on first page', () => {
      const mockFirstPage: Page = {
        ...mockPage,
        pageNumber: 0,
        firstPage: true,
      };

      render(<Pagination page={mockFirstPage} onSearch={mockOnSearch} />);

      const prevBtn = screen.getByTestId('previous-button');
      fireEvent.click(prevBtn);

      expect(mockOnSearch).toHaveBeenCalledTimes(0);
      expect(prevBtn).toBeDisabled();
    });

    it('next button is disabled on last page', () => {
      const mockLastPage: Page = {
        ...mockPage,
        pageNumber: 6,
        lastPage: true,
      };

      render(<Pagination page={mockLastPage} onSearch={mockOnSearch} />);

      const nextBtn = screen.getByTestId('next-button');
      fireEvent.click(nextBtn);

      expect(mockOnSearch).toHaveBeenCalledTimes(0);
      expect(nextBtn).toBeDisabled();
    });

    it('buttons are not disabled on middle page', () => {
      render(<Pagination page={mockPage} onSearch={mockOnSearch} />);

      const prevBtn = screen.getByTestId('previous-button');
      const nextBtn = screen.getByTestId('next-button');

      expect(prevBtn).toBeEnabled();
      expect(nextBtn).toBeEnabled();
    });
  });

  it('calls onSearch on pagination button click', () => {
    const searchTerm = 'test';
    localStorage.setItem(SEARCH_KEY, searchTerm);

    render(<Pagination page={mockPage} onSearch={mockOnSearch} />);

    const prevBtn = screen.getByTestId('previous-button');
    fireEvent.click(prevBtn);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
