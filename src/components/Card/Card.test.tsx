import { describe, expect, it } from 'vitest';
import { Card } from './Card';
import { render, screen } from '@testing-library/react';
import { genderOptions } from '@shared';
import '@testing-library/jest-dom';

const mockForm = {
  name: 'Aa',
  age: 30,
  email: 'a@gmail.com',
  password: 'Aa!1aa',
  country: 'Albania',
  gender: 'm',
  picture: 'pic',
  type: 'controlled' as const,
};

const fieldsConfig = [
  { key: 'name', text: 'Name' },
  { key: 'age', text: 'Age' },
  { key: 'email', text: 'Email' },
  { key: 'password', text: 'Password' },
  { key: 'country', text: 'Country' },
  {
    key: 'gender',
    text: 'Gender',
    transform: (value: string) =>
      genderOptions.find((gender) => gender.value === value)?.text || value,
  },
];

describe('Card component', () => {
  it('renders all fields with correct data', () => {
    render(<Card form={mockForm} />);

    fieldsConfig.forEach(({ key, transform }) => {
      const el = screen.getByTestId(`card-${key}`);
      const expectedText = transform
        ? transform(String(mockForm[key as keyof typeof mockForm]))
        : String(mockForm[key as keyof typeof mockForm]);
      expect(el).toHaveTextContent(expectedText);
    });
  });

  it('applies highlight class if highlight is true', () => {
    render(<Card form={mockForm} highlight />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border-green-500');
  });

  it('applies normal border class if highlight is false', () => {
    render(<Card form={mockForm} highlight={false} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border-neutral-700');
  });
});
