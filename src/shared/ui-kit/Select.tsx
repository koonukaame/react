import type { SelectHTMLAttributes } from 'react';

type Props = {
  options: { value: string; text: string }[];
  label: string;
  id: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ options, label, id, ...rest }: Props) => {
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <select
        name={id}
        id={id}
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
