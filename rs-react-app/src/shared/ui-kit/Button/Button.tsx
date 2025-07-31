import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  classNames?: string;
};

export function Button({ classNames, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'bg-rose-700/80 hover:bg-rose-800 text-white font-medium px-6 py-2 rounded-full shadow transition cursor-pointer',
        classNames
      )}
    />
  );
}
