import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  classNames?: string;
};

export const Button = ({ classNames, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        ' bg-rose-700/80 dark:bg-rose-300  hover:bg-rose-800 dark:hover:bg-rose-400 text-white dark:text-stone-800 font-medium px-6 py-2 rounded-full shadow transition cursor-pointer',
        classNames
      )}
    />
  );
};
