import { Button, TextInput } from '@shared';
import { useCallback, useState } from 'react';

type Props = {
  onClick: (country: string) => void;
};

export const CountryInput = ({ onClick }: Props) => {
  const [input, setInput] = useState<string>('');

  const handleClick = useCallback(() => {
    onClick(input.trim());
  }, [input, onClick]);

  return (
    <div className="flex gap-2">
      <TextInput
        type="text"
        placeholder="Enter country"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleClick}>Choose Country</Button>
    </div>
  );
};
