import { MsgBlock } from '../MsgBlock/MsgBlock';
import { CharsResult } from '../CharsResult';
import { Spinner } from '../Spinner';
import { ItemDetails } from '../ItemDetails';
import type { Character } from '../../entities';

type Props = {
  hasError: boolean;
  isLoading: boolean;
  selectedChar: Character | null;
};

export function ResultDisplay({ hasError, isLoading, selectedChar }: Props) {
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

  return (
    <div className="flex gap-6">
      <div className={selectedChar ? 'w-1/3' : 'w-full'}>
        <CharsResult />
      </div>
      {selectedChar && (
        <div className="w-1/3">
          <ItemDetails character={selectedChar} />
        </div>
      )}
    </div>
  );
}
