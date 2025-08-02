import { useLocation, useNavigate, useSearchParams } from 'react-router';
import type { Character } from '../../..';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../../app';
import { unselectCharacter, selectCharacter } from '../../../../features';

type Props = {
  characters: Character[];
};

export const CharacterList = ({ characters }: Props) => {
  const [params] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const charactersState = useSelector((state: RootState) => state.select);

  return (
    <ul
      className={`${location.pathname !== '/character' ? 'w-1/3' : 'w-full'} text-center overflow-y-auto `}
      data-testid="character-list"
    >
      {characters.map((character) => (
        <li
          key={character.uid}
          className="w-full flex justify-center hover:bg-rose-200 dark:hover:bg-stone-600"
          onClick={() =>
            navigate({
              pathname: `/character/${character.uid}`,
              search: params.toString(),
            })
          }
        >
          <input
            data-testid="checkbox"
            type="checkbox"
            checked={charactersState.some((char) => char.uid === character.uid)}
            onChange={() =>
              charactersState.some((char) => char.uid === character.uid)
                ? dispatch(unselectCharacter(character))
                : dispatch(selectCharacter(character))
            }
          />
          <span className="px-4 py-2 text-rose-800 dark:text-stone-200 transition-colors">
            {character.name ?? 'Anonymous character'}
          </span>
        </li>
      ))}
    </ul>
  );
};
