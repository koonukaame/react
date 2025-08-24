import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Main } from './Main';
import { Provider } from 'react-redux';
import { mockStore } from '@test';

describe('Main page', () => {
  describe('Rendering', () => {
    it('renders main page', () => {
      render(
        <Provider store={mockStore}>
          <Main />
        </Provider>
      );
      const main = screen.getByTestId('main');

      expect(main).toBeInTheDocument();
    });

    it('renders uncontrolled form', () => {
      render(
        <Provider store={mockStore}>
          <Main />
        </Provider>
      );

      const uncontrolledBtn = screen.getByTestId('uncontrolled-button');
      fireEvent.click(uncontrolledBtn);

      const uncontrolledForm = screen.getByTestId('uncontrolled-form');
      expect(uncontrolledForm).toBeInTheDocument();
    });

    it('renders controlled form', () => {
      render(
        <Provider store={mockStore}>
          <Main />
        </Provider>
      );

      const controlledBtn = screen.getByTestId('controlled-button');
      fireEvent.click(controlledBtn);

      const controlledForm = screen.getByTestId('controlled-form');
      expect(controlledForm).toBeInTheDocument();
    });
  });
});
