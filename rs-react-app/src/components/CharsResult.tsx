import { Component } from 'react';
import type { Character } from '../entities';
import { MsgBlock } from './MsgBlock';
import { CharsTable } from './CharsTable';

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
