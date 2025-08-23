import type { InputHTMLAttributes } from 'react';

type Props = {
  isControlled: boolean;
  onChange?: (value: string) => void;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ onChange, isControlled, error, ...rest }: Props) => {
  return (
    <div>
      {isControlled ? (
        <input
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className="p-2 border border-neutral-700 w-full rounded-md"
          {...rest}
        />
      ) : (
        <input
          {...rest}
          className="p-2 border border-neutral-700 w-full rounded-md"
        />
      )}
      <div className="text-red-500/90 h-5">{error}</div>
    </div>
  );
};
