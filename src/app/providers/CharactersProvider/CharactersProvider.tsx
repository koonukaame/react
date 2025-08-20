import type { CharacterResponse } from '@entities';
import type { ReactNode } from 'react';
import { CharactersContext } from './CharactersContext';

type Props = {
  children: ReactNode;
  data: CharacterResponse | null;
};

export const CharactersProvider = ({ children, data }: Props) => {
  return (
    <CharactersContext.Provider value={data}>
      {children}
    </CharactersContext.Provider>
  );
};
