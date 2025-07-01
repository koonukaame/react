import { Component } from 'react';
import type { Conflict } from '../entities';

type Props = {
  items: Conflict[];
};

export class List extends Component<Props> {
  render() {
    return (
      <ul>
        {this.props.items.map((conflict) => (
          <li key={conflict.uid}>
            {conflict.uid} {conflict.name}
          </li>
        ))}
      </ul>
    );
  }
}
