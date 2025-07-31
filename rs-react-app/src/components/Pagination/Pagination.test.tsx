import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination component', () => {
  const mockOnChange = vi.fn();
  const mockProps = {
    page: 10,
    onChange: mockOnChange,
    totalPages: 50,
  };
  it('renders without errors', () => {
    render(<Pagination {...mockProps} />);

    const page = screen.getByTestId('pagination');

    expect(page).toBeInTheDocument();
  });

  it('shows correct current page and total pages', () => {
    render(<Pagination {...mockProps} />);
    const page = screen.getByText(
      `${mockProps.page} / ${mockProps.totalPages}`
    );
    expect(page).toBeInTheDocument();
  });

  describe('Buttons Behaviour', () => {
    it('previous button is disabled on first page', () => {
      const mockProps = {
        page: 1,
        onChange: mockOnChange,
        totalPages: 50,
      };
      render(<Pagination {...mockProps} />);

      const prevBtn = screen.getByTestId('previous-button');
      fireEvent.click(prevBtn);

      expect(mockOnChange).toHaveBeenCalledTimes(0);
      expect(prevBtn).toBeDisabled();
    });

    it('next button is disabled on last page', () => {
      const mockProps = {
        page: 50,
        onChange: mockOnChange,
        totalPages: 50,
      };

      render(<Pagination {...mockProps} />);

      const nextBtn = screen.getByTestId('next-button');
      fireEvent.click(nextBtn);

      expect(mockOnChange).toHaveBeenCalledTimes(0);
      expect(nextBtn).toBeDisabled();
    });
  });
});
