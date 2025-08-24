import { describe, expect, it, vi } from 'vitest';
import { UncontrolledForm } from './UncontrolledForm';
import { mockStore } from '@test';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const fieldTestIds = [
  'uncontrolled-name',
  'uncontrolled-age',
  'uncontrolled-email',
  'uncontrolled-password',
  'uncontrolled-password-repeat',
  'uncontrolled-country',
  'uncontrolled-gender',
  'uncontrolled-tos',
];

describe('Uncontrolled Form', () => {
  const onClose = vi.fn();

  it('renders with all required fields', () => {
    render(
      <Provider store={mockStore}>
        <UncontrolledForm onClose={onClose} />
      </Provider>
    );

    const fields = fieldTestIds.map((id) => screen.getByTestId(id));
    fields.forEach((field) => expect(field).toBeInTheDocument());
  });

  it('validates fields', () => {
    render(
      <Provider store={mockStore}>
        <UncontrolledForm onClose={onClose} />
      </Provider>
    );

    const submitBtn = screen.getByTestId('button-submit');
    fireEvent.click(submitBtn);

    const errors = screen.getAllByTestId('error');
    expect(errors).toHaveLength(fieldTestIds.length);
  });
});
