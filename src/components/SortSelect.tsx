import type { Sort } from '@shared';
import { useCallback, type ChangeEvent } from 'react';

type Option = {
  value: Sort;
  text: string;
};

const OPTIONS: Option[] = [
  { value: 'country-asc', text: 'By country (asc)' },
  { value: 'country-desc', text: 'By country (desc)' },
  { value: 'population-asc', text: 'By population (asc)' },
  { value: 'population-desc', text: 'By population (desc)' },
];

type Props = {
  value: Sort;
  onChange: (value: Sort) => void;
};

export const SortSelect = ({ value, onChange }: Props) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value as Sort);
    },
    [onChange]
  );

  return (
    <div>
      Sort:{' '}
      <select
        id="sort"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded px-2 py-2 w-3xs cursor-pointer"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
