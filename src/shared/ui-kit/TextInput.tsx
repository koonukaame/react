import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = (props: Props) => {
  return (
    <input
      {...props}
      className="border border-gray-300 rounded px-2 py-1 w-3xs"
    />
  );
};
