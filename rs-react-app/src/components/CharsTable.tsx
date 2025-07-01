import { Component } from 'react';
import type { Character } from '../entities';

type Props = {
  items: Character[];
};

const charMap = [
  { key: 'name', title: 'Name', dataToRender: 'name' },
  { key: 'gender', title: 'Gender', dataToRender: 'gender' },
  { key: 'birth', title: 'Birth', dataToRender: 'yearOfBirth' },
  { key: 'death', title: 'Death', dataToRender: 'yearOfDeath' },
];

export class CharsTable extends Component<Props> {
  render() {
    return (
      <table>
        {this.props.items.length > 0 && (
          <thead>
            <tr>
              {charMap.map((chat) => (
                <th key={chat.key}>{chat.title}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {this.props.items.map((character) => (
            <tr key={character.uid}>
              {charMap.map((char) => (
                <td key={char.key}>
                  {character[char.dataToRender as keyof Character] ?? 'Unknown'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
