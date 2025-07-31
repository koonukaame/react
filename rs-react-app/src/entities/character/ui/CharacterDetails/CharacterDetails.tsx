import { Link, useSearchParams } from 'react-router';
import type { Character } from '../../..';
import { CHAR_MAP } from '../../../../shared';

type Props = {
  character: Character;
};

export const CharacterDetails = ({ character }: Props) => {
  const [params] = useSearchParams();

  return (
    <div className="w-2/3 relative pb-6 px-6" data-testid="item-details">
      <div className="flex w-full justify-between border-b border-rose-800 pb-2">
        <h2 className="text-xl font-bold text-rose-800" data-testid="char-name">
          {character.name}
        </h2>
        <Link
          to={{ pathname: '/character', search: params.toString() }}
          className="w-5 cursor-pointer mt-1 group"
          data-testid="item-details-close"
        >
          <div className="w-full h-0.5 bg-gray-500 rotate-45 group-hover:bg-rose-800 transition-colors" />
          <div className="w-full h-0.5 bg-gray-500 -rotate-45 -mt-0.5 group-hover:bg-rose-800 transition-colors" />
        </Link>
      </div>

      <ul className="space-y-2 pt-2">
        {CHAR_MAP.map((char) => (
          <li
            key={char.key}
            className="flex justify-between text-sm text-gray-700"
          >
            <span className="font-semibold text-rose-700">{char.title}:</span>
            <span>{character[char.dataToRender]?.toString() ?? 'Unknown'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
