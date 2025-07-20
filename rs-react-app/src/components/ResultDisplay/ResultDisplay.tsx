import { MsgBlock } from '../MsgBlock/MsgBlock';
import { CharsResult } from '../CharsResult';
import { CharactersContext } from '../../features';
import { useContext } from 'react';

type Props = {
  hasError: boolean;
};

export function ResultDisplay({ hasError }: Props) {
  useContext(CharactersContext);

  return hasError ? (
    <MsgBlock
      title="An unexpected error has occured"
      msg="Try again in a bit!"
    />
  ) : (
    <CharsResult />
  );
}
