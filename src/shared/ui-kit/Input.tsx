import type { InputHTMLAttributes } from 'react';

type Props = {
  isControlled: boolean;
  onChange?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ onChange, isControlled, ...rest }: Props) => {
  return isControlled ? (
    <input
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className="p-2 border border-neutral-700"
      {...rest}
    />
  ) : (
    <input {...rest} className="p-2 border border-neutral-700" />
  );
};
