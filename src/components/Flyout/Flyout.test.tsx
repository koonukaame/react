import { it, describe, expect, beforeAll, vi } from 'vitest';
import { mockChars, mockStore } from '@test';
import { Provider } from 'react-redux';
import { Flyout } from './Flyout';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from '@features';

describe('Flyout component', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:url');
  });
  describe('Rendering', () => {
    it('renders Flyout component wuthout errors', () => {
      const store = configureStore({
        reducer: {
          select: selectSlice.reducer,
        },
        preloadedState: {
          select: mockChars,
        },
      });

      render(
        <Provider store={store}>
          <Flyout />
        </Provider>
      );

      const flyout = screen.getByTestId('flyout');
      expect(flyout).toBeInTheDocument();
    });

    it('does not render Flyout component if no data is provided', () => {
      render(
        <Provider store={mockStore}>
          <Flyout />
        </Provider>
      );

      const flyout = screen.queryByTestId('flyout');
      expect(flyout).not.toBeInTheDocument();
    });
  });

  describe('Number category rendering', () => {
    it('renders singular text when one character is selected & generates correct CSV filename', () => {
      const store = configureStore({
        reducer: {
          select: selectSlice.reducer,
        },
        preloadedState: {
          select: [mockChars[0]],
        },
      });

      render(
        <Provider store={store}>
          <Flyout />
        </Provider>
      );

      const flyout = screen.getByTestId('flyout');
      fireEvent.click(flyout);

      const itemAmount = screen.getByText('1 item is selected');
      const link = screen.getByTestId('download-file');

      expect(itemAmount).toBeInTheDocument();
      expect(link).toHaveAttribute('download', '1_item.csv');
    });

    it('renders plural text when several characters are selected & generates correct CSV filename', () => {
      const store = configureStore({
        reducer: {
          select: selectSlice.reducer,
        },
        preloadedState: {
          select: mockChars,
        },
      });

      render(
        <Provider store={store}>
          <Flyout />
        </Provider>
      );

      const flyout = screen.getByTestId('flyout');
      fireEvent.click(flyout);

      const itemAmount = screen.getByText(
        `${mockChars.length} items are selected`
      );
      const link = screen.getByTestId('download-file');

      expect(itemAmount).toBeInTheDocument();
      expect(link).toHaveAttribute('download', `${mockChars.length}_items.csv`);
    });
  });
});
