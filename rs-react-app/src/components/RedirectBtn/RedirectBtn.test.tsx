import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RedirectBtn } from './RedirectBtn';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

const mockNavigate = vi.fn();

describe('RedirectBtn component', () => {
  const mockProps = {
    url: '/hello',
    locationText: 'hello',
  };

  it('renders redirect button without errors', () => {
    render(
      <MemoryRouter>
        <RedirectBtn {...mockProps} />
      </MemoryRouter>
    );

    const redirectBtn = screen.getByTestId('redirect-button');

    expect(redirectBtn).toBeInTheDocument();
    expect(redirectBtn).toHaveTextContent(mockProps.locationText);
  });

  it('calls navigate with correct URL when clicked', () => {
    vi.mock('react-router', async () => {
      const originalModule = await vi.importActual('react-router');
      return {
        ...originalModule,
        useNavigate: () => mockNavigate,
      };
    });

    render(
      <MemoryRouter>
        <RedirectBtn {...mockProps} />
      </MemoryRouter>
    );

    const button = screen.getByTestId('redirect-button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(mockProps.url);
  });
  vi.restoreAllMocks();
});
