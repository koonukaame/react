import { useState } from 'react';

type Props = {
  onClick: (country: string) => void;
};

export const CountryInput = ({ onClick }: Props) => {
  const [input, setInput] = useState<string>('');
  return (
    <div>
      <input
        type="text"
        placeholder="enter counry"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => onClick(input.trim())}>Choose Country</button>
    </div>
  );
};
