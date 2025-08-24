import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';
import { Button } from '../Button';
import '@testing-library/jest-dom';

describe('Modal component', () => {
  const onClose = vi.fn();

  it('renders children', () => {
    render(
      <Modal onClose={onClose}>
        <Button data-testid="btn" text="a" />
      </Modal>
    );

    const child = screen.getByTestId('btn');
    expect(child).toBeInTheDocument();
  });

  it('calls onClose when clicking on an overlay', () => {
    render(
      <Modal onClose={onClose}>
        <Button data-testid="btn" text="a" />
      </Modal>
    );
    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on Esc button', () => {
    render(
      <Modal onClose={onClose}>
        <Button data-testid="btn" text="a" />
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
