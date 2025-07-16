import { Component, type ReactNode } from 'react';
import { MsgBlock } from './MsgBlock';
import { CharsResult } from './CharsResult';
import { CharactersContext } from '../features';

type Props = {
  hasError: boolean;
};

export class ResultDisplay extends Component<Props> {
  static contextType = CharactersContext;
  declare context: React.ContextType<typeof CharactersContext>;

  render(): ReactNode {
    return this.props.hasError ? (
      <MsgBlock
        title="An unexpected error has occured"
        msg="Try again in a bit!"
      />
    ) : (
      <CharsResult />
    );
  }
}
