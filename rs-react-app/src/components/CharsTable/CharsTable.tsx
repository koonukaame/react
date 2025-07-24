import { Component } from 'react';
import type { Character } from '../../entities';
import { CharactersContext } from '../../features';

type CharMapType = {
  key: string;
  title: string;
  dataToRender: keyof Character;
}[];

const charMap: CharMapType = [
  { key: 'name', title: 'Name', dataToRender: 'name' },
  { key: 'gender', title: 'Gender', dataToRender: 'gender' },
  { key: 'birth', title: 'Birth', dataToRender: 'yearOfBirth' },
  { key: 'death', title: 'Death', dataToRender: 'yearOfDeath' },
];

export class CharsTable extends Component {
  static contextType = CharactersContext;
  declare context: React.ContextType<typeof CharactersContext>;

  render() {
    return (
      <table
        className="w-full text-center rounded-xl shadow my-4"
        data-testid="chars-table"
      >
        {this.context.characters.length > 0 && (
          <thead>
            <tr className="bg-rose-200 text-rose-800">
              {charMap.map((char) => (
                <th className="py-2 px-4" key={char.key}>
                  {char.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-rose-100">
          {this.context.characters.map((character) => (
            <tr key={character.uid}>
              {charMap.map((char) => (
                <td className="py-2 px-4" key={char.key}>
                  {character[char.dataToRender] ?? 'Unknown'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
