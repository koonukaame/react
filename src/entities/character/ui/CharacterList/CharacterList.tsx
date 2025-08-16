'use client';

import type { Character } from '../../model';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@app';
import { unselectCharacter, selectCharacter } from '@features';
import { useSearchParams, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n';

type Props = {
  characters: Character[];
};

export const CharacterList = ({ characters }: Props) => {
  const params = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations('list');
  const { uid } = useParams();

  const charactersState = useSelector((state: RootState) => state.select);

  return (
    <ul
      className={`${uid ? 'w-1/3' : 'w-full'} text-center overflow-y-auto`}
      data-testid="character-list"
    >
      {characters.map((character) => (
        <li
          key={character.uid}
          className="w-full flex items-center justify-center hover:bg-rose-200 dark:hover:bg-stone-600 cursor-pointer"
          onClick={() => {
            router.push(
              params?.toString()
                ? `/character/${character.uid}?${params?.toString()}`
                : `/character/${character.uid}`
            );
          }}
        >
          <input
            className="w-4 h-4 accent-rose-700/80 dark:accent-rose-300 cursor-pointer"
            data-testid="checkbox"
            type="checkbox"
            checked={charactersState.some((char) => char.uid === character.uid)}
            onClick={(e) => e.stopPropagation()}
            onChange={() =>
              charactersState.some((char) => char.uid === character.uid)
                ? dispatch(unselectCharacter(character))
                : dispatch(selectCharacter(character))
            }
          />
          <span className="px-4 py-2 text-rose-800 dark:text-stone-200 transition-colors">
            {character.name ?? t('unknown')}
          </span>
        </li>
      ))}
    </ul>
  );
};
