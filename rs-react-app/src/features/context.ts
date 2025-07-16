import { type Character } from '../entities';
import { createContext } from 'react';

type Context = {
  characters: Character[];
};

export const CharactersContext = createContext<Context>({
  characters: [],
});
