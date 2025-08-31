import type { Country } from '@entities';
import { Button, TextInput } from '@shared';
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
    <div className="flex gap-2">
      <TextInput
        type="number"
        placeholder={`Enter year (${latest} by default)`}
        onChange={(e) =>
          setInput(Number(e.target.value) ? Number(e.target.value) : null)
        }
        min={earliest}
        max={latest}
      />
      <Button onClick={() => onClick(input)}>Choose Year</Button>
    </div>
  );
};
