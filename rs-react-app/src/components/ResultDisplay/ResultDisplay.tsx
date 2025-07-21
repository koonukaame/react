import { MsgBlock } from '../MsgBlock/MsgBlock';
import { CharsResult } from '../CharsResult';
import { CharactersContext } from '../../features';
import { useContext } from 'react';
import { Spinner } from '../Spinner';

type Props = {
  hasError: boolean;
  isLoading: boolean;
};

export function ResultDisplay({ hasError, isLoading }: Props) {
  useContext(CharactersContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return (
      <MsgBlock
        title="An unexpected error has occured"
        msg="Try again in a bit!"
      />
    );
  }

  return <CharsResult />;
}
