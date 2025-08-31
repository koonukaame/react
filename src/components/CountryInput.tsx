import { Button, TextInput } from '@shared';
import { useState } from 'react';

type Props = {
  onClick: (country: string) => void;
};

export const CountryInput = ({ onClick }: Props) => {
  const [input, setInput] = useState<string>('');
  return (
    <div className="flex gap-2">
      <TextInput
        type="text"
        placeholder="Enter country"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={() => onClick(input.trim())}>Choose Country</Button>
    </div>
  );
};
