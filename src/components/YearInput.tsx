import type { Country } from '@entities';
import { Button, TextInput } from '@shared';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  onClick: (year: number | null) => void;
  data: Country;
};

export const YearInput = ({ onClick, data }: Props) => {
  const [input, setInput] = useState<number | null>(null);
  const representativeCountry = data['Australia'];
  const earliest = useMemo(
    () => representativeCountry?.data?.at(0)?.year,
    [representativeCountry]
  );
  const latest = useMemo(
    () => representativeCountry?.data?.at(-1)?.year,
    [representativeCountry]
  );

  const handleClick = useCallback(() => {
    onClick(input);
  }, [input, onClick]);

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
      <Button onClick={handleClick}>Choose Year</Button>
    </div>
  );
};
