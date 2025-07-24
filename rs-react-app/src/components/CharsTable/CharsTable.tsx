import { useContext } from 'react';
import { CharactersContext } from '../../features';
import { CHAR_MAP } from '../../shared';

export function CharsTable() {
  const context = useContext(CharactersContext);
  const characters = context.characters;
  const setSelectedChar = context.setSelectedChar;

  return (
    <table
      className="text-center my-4 overflow-y-auto w-full"
      data-testid="chars-table"
    >
      {characters.length > 0 && (
        <thead>
          <tr className="bg-rose-200 text-rose-800">
            {CHAR_MAP.slice(0, 1).map((char) => (
              <th className="py-2 px-4" key={char.key}>
                {char.title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="divide-y divide-rose-100">
        {characters.map((character) => (
          <tr
            key={character.uid}
            onClick={() => setSelectedChar(character.uid)}
          >
            {CHAR_MAP.slice(0, 1).map((char) => (
              <td className="py-2 px-4" key={char.key}>
                {character[char.dataToRender]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
