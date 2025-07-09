import { Component } from 'react';
import type { Character } from '../entities';
import { CharsTable, MsgBlock } from './index';

type Props = {
  characters: Character[];
};

export class CharsResult extends Component<Props> {
  render() {
    if (this.props.characters.length === 0) {
      return (
        <MsgBlock
          title="No characters found 🕵️‍♀️"
          msg="Try adjusting your search, maybe a typo snuck in?"
        />
      );
    }

    return <CharsTable characters={this.props.characters} />;
  }
}
