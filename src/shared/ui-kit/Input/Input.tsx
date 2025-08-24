import type { InputHTMLAttributes } from 'react';
import { PasswordStrength } from '@components';
import { useFormContext } from 'react-hook-form';

export type Props = {
  error?: string;
  id: string;
  label: string;
  type: string;
  passwordStrength?: 'none' | 'weak' | 'medium' | 'strong';
  registerName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  error,
  id,
  label,
  type,
  passwordStrength,
  registerName,
  ...rest
}: Props) => {
  const formContext = useFormContext();

  const controlledProps = registerName
    ? formContext.register(registerName)
    : null;

  return type === 'checkbox' ? (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        <label htmlFor={id}>{label}</label>
        <input
          name={id}
          id={id}
          type={type}
          {...controlledProps}
          {...rest}
          className="p-2 h-4 w-4 border border-neutral-700 rounded-md"
        />
      </div>

      <div className="text-red-500/90 h-5">{error}</div>
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <label htmlFor={id}>{label}</label>
        {passwordStrength && <PasswordStrength strength={passwordStrength} />}
      </div>

      <input
        name={id}
        id={id}
        type={type}
        {...rest}
        {...controlledProps}
        className="p-2 border border-neutral-700 w-full rounded-md"
      />
      <div className="text-red-500/90 h-5">{error}</div>
    </div>
  );
};
