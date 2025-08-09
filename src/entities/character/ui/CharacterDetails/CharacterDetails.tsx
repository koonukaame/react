import { Link, useSearchParams } from 'react-router';
import type { Character } from '../../model';
import { CHAR_MAP } from '@shared';

type Props = {
  character: Character;
};

export const CharacterDetails = ({ character }: Props) => {
  const [params] = useSearchParams();

  return (
    <div className="relative pb-6 px-6" data-testid="character-details">
      <div className="flex w-full justify-between border-b border-rose-800 dark:border-stone-700 pb-2">
        <h2
          className="text-xl font-bold text-rose-800 dark:text-stone-200"
          data-testid="char-name"
        >
          {character.name}
        </h2>
        <Link
          to={{ pathname: '/character', search: params.toString() }}
          className="w-5 cursor-pointer mt-4 group"
          data-testid="item-details-close"
        >
          <div className="w-full h-0.5 bg-stone-500 dark:bg-stone-400 dark: rotate-45 group-hover:bg-rose-800 dark:group-hover:bg-rose-300 transition-colors" />
          <div className="w-full h-0.5 bg-stone-500 dark:bg-stone-400 -rotate-45 -mt-0.5 group-hover:bg-rose-800 dark:group-hover:bg-rose-300 transition-colors" />
        </Link>
      </div>

      <ul className="space-y-2 pt-2">
        {CHAR_MAP.map((char) => (
          <li
            key={char.key}
            className="flex justify-between text-sm text-stone-800 dark:text-stone-400"
          >
            <span className="font-semibold text-rose-700 dark:text-stone-200">
              {char.title}:
            </span>
            <span>{character[char.dataToRender]?.toString() ?? 'Unknown'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
