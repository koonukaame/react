import type { Country } from '@entities';
import { useState } from 'react';

type Props = {
  onClick: (year: number | null) => void;
  data: Country;
};

export const YearInput = ({ onClick, data }: Props) => {
  const [input, setInput] = useState<number | null>(null);
  const representativeCountry = data['Australia'];
  const earliest = representativeCountry?.data?.at(0)?.year;
  const latest = representativeCountry?.data?.at(-1)?.year;

  return (
    <div>
      <input
        type="number"
        placeholder={`${latest} by default`}
        onChange={(e) =>
          setInput(Number(e.target.value) ? Number(e.target.value) : null)
        }
        min={earliest}
        max={latest}
      />
      <button onClick={() => onClick(input)}>Choose Year</button>
    </div>
  );
};
