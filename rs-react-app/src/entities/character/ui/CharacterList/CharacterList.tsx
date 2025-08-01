import { Link, useLocation, useSearchParams } from 'react-router';
import type { Character } from '../../..';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../../app';
import { unselectCharacter, selectCharacter } from '../../../../features';

type Props = {
  characters: Character[];
};

export function CharacterList({ characters }: Props) {
  const [params] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const uids = useSelector((state: RootState) => state.select);

  console.log(uids);

  return (
    <ul
      className={`${location.pathname !== '/character' ? 'w-1/3' : 'w-full'} text-center overflow-y-auto `}
      data-testid="character-list"
    >
      {characters.map((character) => (
        <li key={character.uid} className="w-full flex justify-center">
          <input
            type="checkbox"
            checked={uids.includes(character)}
            onChange={() =>
              uids.includes(character)
                ? dispatch(unselectCharacter(character))
                : dispatch(selectCharacter(character))
            }
          />
          <Link
            to={{
              pathname: `/character/${character.uid}`,
              search: params.toString(),
            }}
            className="px-4 py-2 hover:bg-rose-200 text-rose-800 transition-colors block"
          >
            {character.name ?? 'Anonymous character'}
          </Link>
        </li>
      ))}
    </ul>
  );
}
