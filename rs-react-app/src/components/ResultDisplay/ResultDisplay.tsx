import { MsgBlock } from '../MsgBlock/MsgBlock';
import { CharsResult } from '../CharsResult';
import { Spinner } from '../Spinner';
import { useOutletContext } from 'react-router';

type OutletContext = {
  hasError: boolean;
  isLoading: boolean;
};

export function ResultDisplay() {
  const { hasError, isLoading }: OutletContext = useOutletContext<{
    hasError: boolean;
    isLoading: boolean;
  }>();

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
