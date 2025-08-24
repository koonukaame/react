import type { InputHTMLAttributes } from 'react';
import { PasswordStrength } from '@components';

export type Props = {
  error?: string;
  id: string;
  label: string;
  type: string;
  password?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ error, id, label, type, password, ...rest }: Props) => {
  return type === 'checkbox' ? (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        <label htmlFor={id}>{label}</label>
        <input
          name={id}
          id={id}
          type={type}
          {...rest}
          className="p-2 h-4 w-4 border border-neutral-700 rounded-md"
        />
      </div>

      <div className="text-red-500/90 h-5">{error}</div>
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={id}>{label}</label>
        {password !== undefined && (
          <div className="ml-1 flex-1">
            <PasswordStrength password={password} />
          </div>
        )}
      </div>

      <input
        name={id}
        id={id}
        type={type}
        {...rest}
        className="p-2 border border-neutral-700 w-full rounded-md"
      />
      <div className="text-red-500/90 h-5">{error}</div>
    </div>
  );
};
