import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import type { Page } from '../../entities';

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
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<Pagination page={mockPage} onSearch={mockOnSearch} />);

      const page = screen.getByTestId('pagination');

      expect(page).toBeInTheDocument();
    });
  });

  describe('Page Display', () => {
    it('shows correct current page and total pages', () => {
      render(<Pagination page={mockPage} onSearch={mockOnSearch} />);
      const page = screen.getByText(
        `${mockPage.pageNumber + 1} / ${mockPage.totalPages}`
      );
      expect(page).toBeInTheDocument();
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
});
