import { type Character } from '../entities';
import { createContext } from 'react';

type Context = {
  characters: Character[];
  setSelectedChar: (char: Character | null) => void;
};

export const CharactersContext = createContext<Context>({
  characters: [],
  setSelectedChar: () => {},
});
