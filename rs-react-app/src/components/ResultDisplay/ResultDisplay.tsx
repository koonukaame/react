import { MsgBlock } from '../MsgBlock/MsgBlock';
import { CharsResult } from '../CharsResult';
import { Spinner } from '../Spinner';

type Props = {
  hasError: boolean;
  isLoading: boolean;
};

export function ResultDisplay({ hasError, isLoading }: Props) {
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
