import { Component } from 'react';
import { MsgBlock } from '../MsgBlock';
import { CharsTable } from '../CharsTable';
import { CharactersContext } from '../../features';

export class CharsResult extends Component {
  static contextType = CharactersContext;
  declare context: React.ContextType<typeof CharactersContext>;

  render() {
    if (this.context.characters.length === 0) {
      return (
        <MsgBlock
          title="No characters found 🕵️‍♀️"
          msg="Try adjusting your search, maybe a typo snuck in?"
        />
      );
    }

    return <CharsTable />;
  }
}
