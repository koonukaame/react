import { Component } from 'react';
import type { Character } from '../entities';

type Props = {
  characters: Character[];
};

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

export class CharsTable extends Component<Props> {
  render() {
    return (
      <table className="w-full text-center rounded-xl shadow my-4">
        {this.props.characters.length > 0 && (
          <thead>
            <tr className="bg-rose-200 text-rose-800">
              {charMap.map((chat) => (
                <th className="py-2 px-4" key={chat.key}>
                  {chat.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-rose-100">
          {this.props.characters.map((character) => (
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
