import type { SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

export type Props = {
  options: { value: string; text: string }[];
  label: string;
  id: string;
  registerName?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  options,
  label,
  id,
  registerName,
  ...rest
}: Props) => {
  const formContext = useFormContext();

  const controlledProps = registerName
    ? formContext.register(registerName)
    : null;

  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <select
        name={id}
        id={id}
        {...controlledProps}
        {...rest}
        className="w-full p-2 border border-neutral-700 rounded-md text-white"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-neutral-800 text-white py-2"
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
