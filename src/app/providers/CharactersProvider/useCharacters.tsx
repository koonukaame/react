import { useContext } from 'react';
import { CharactersContext } from './CharactersContext';

export const useCharacters = () => {
  const context = useContext(CharactersContext);

  return context;
};
