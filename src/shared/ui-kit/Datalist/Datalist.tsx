import type { InputHTMLAttributes } from 'react';
import { useMainSelector } from '../../hooks';
import { useFormContext } from 'react-hook-form';

export type Props = {
  label: string;
  id: string;
  error?: string;
  registerName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Datalist = ({
  label,
  id,
  error,
  registerName,
  ...rest
}: Props) => {
  const formContext = useFormContext();

  const controlledProps = registerName
    ? formContext.register(registerName)
    : null;
  const countries = useMainSelector((state) => state.countries);

  return (
    <div className="w-full">
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          list={`${id}-list`}
          id={id}
          name={id}
          {...controlledProps}
          {...rest}
          className="w-full p-2 border border-neutral-700 rounded-md text-white"
        />
        <datalist id={`${id}-list`}>
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>
      <div className="text-red-500/90 h-5" data-testid="error">
        {error}
      </div>
    </div>
  );
};
