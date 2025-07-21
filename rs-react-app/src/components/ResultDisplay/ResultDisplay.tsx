import { Component, type ReactNode } from 'react';
import { MsgBlock } from '../MsgBlock/MsgBlock';
import { CharsResult } from '../CharsResult';
import { CharactersContext } from '../../features';
import { Spinner } from '../Spinner';

type Props = {
  hasError: boolean;
  isLoading: boolean;
};

export class ResultDisplay extends Component<Props> {
  static contextType = CharactersContext;
  declare context: React.ContextType<typeof CharactersContext>;

  render(): ReactNode {
    if (this.props.isLoading) {
      return <Spinner />;
    }

    if (this.props.hasError) {
      return (
        <MsgBlock
          title="An unexpected error has occured"
          msg="Try again in a bit!"
        />
      );
    }

    return <CharsResult />;
  }
}
