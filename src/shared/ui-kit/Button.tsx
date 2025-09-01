import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="py-2 px-4 bg-white border border-gray-300 rounded hover:bg-gray-100 transition cursor-pointer"
    >
      {children}
    </button>
  );
};
