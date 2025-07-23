import type { Character } from '../../entities';
import { CHAR_MAP } from '../../shared/constants';

type Props = {
  character: Character;
};

export function ItemDetails({ character }: Props) {
  return (
    <div>
      <h2>{character.name}</h2>
      <ul>
        {CHAR_MAP.map((char) => (
          <li key={char.key}>{character[char.dataToRender] ?? 'Unknown'}</li>
        ))}
      </ul>
    </div>
  );
}
