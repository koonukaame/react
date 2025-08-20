'use client';

import { CharacterList } from '../../../../src/entities';
import { useCharacters } from '../../../../src/app';

export default function ListPage() {
  const data = useCharacters();

  return <CharacterList characters={data.characters} />;
}
