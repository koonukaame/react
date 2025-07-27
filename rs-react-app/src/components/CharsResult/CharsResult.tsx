import { useContext } from 'react';
import { MsgBlock } from '../MsgBlock';
import { CharsTable } from '../CharsTable';
import { CharactersContext } from '../../features';

export function CharsResult() {
  const context = useContext(CharactersContext);
  const characters = context.characters;

  return (
    <div className="overflow-y-auto w-1/3 bg-rose-50">
      {!characters?.length ? (
        <MsgBlock
          title="No characters found 🕵️‍♀️"
          msg="Try adjusting your search, maybe a typo snuck in?"
        />
      ) : (
        <CharsTable />
      )}
    </div>
  );
}
