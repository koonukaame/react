import { Component, type ReactNode } from 'react';
import { type Character } from '../entities';
import { MsgBlock } from './MsgBlock';
import { CharsResult } from './CharsResult';

type Props = {
  isError: boolean;
  characters: Character[];
};

export class ResultDisplay extends Component<Props> {
  render(): ReactNode {
    return this.props.isError ? (
      <MsgBlock
        title="An unexpected error has occured"
        msg="Try again in a bit!"
      />
    ) : (
      <CharsResult characters={this.props.characters} />
    );
  }
}
