import type { Sort } from '@shared';

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
  return (
    <div>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as Sort)}
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
