import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib';

type Props = {
  text: string;
  onClick?: () => void;
  isDanger?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ text, onClick, isDanger, ...rest }: Props) => {
  return (
    <button
      className={cn(
        'py-3 rounded-lg text-xl min-w-[300px] text-indigo-50 cursor-pointer transition duration-200 mt-0 disabled:bg-neutral-700 disabled:cursor-not-allowed',
        isDanger
          ? 'bg-red-500/40 hover:bg-red-500/50 active:bg-red-500/60'
          : 'bg-violet-500/40 hover:bg-violet-500/50 active:bg-violet-500/60'
      )}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
};
