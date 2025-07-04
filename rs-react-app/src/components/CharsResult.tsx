import { Component } from 'react';
import type { Character } from '../entities';
import { CharsTable, CharsNotFound } from './index';

type Props = {
  characters: Character[];
};

export class CharsResult extends Component<Props> {
  render() {
    if (this.props.characters.length === 0) {
      return <CharsNotFound />;
    }

    return <CharsTable characters={this.props.characters} />;
  }
}
