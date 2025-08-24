import { expect, it, vi } from 'vitest';
import { mockStore } from '@test';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ControlledForm } from './ControlledForm';

const fieldTestIds = [
  'controlled-name',
  'controlled-age',
  'controlled-email',
  'controlled-password',
  'controlled-password-repeat',
  'controlled-country',
  'controlled-gender',
  'controlled-tos',
];
const onClose = vi.fn();

it('renders with all required fields', () => {
  render(
    <Provider store={mockStore}>
      <ControlledForm onClose={onClose} />
    </Provider>
  );

  const fields = fieldTestIds.map((id) => screen.getByTestId(id));
  fields.forEach((field) => expect(field).toBeInTheDocument());
});
