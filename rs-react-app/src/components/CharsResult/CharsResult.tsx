import { useContext } from 'react';
import { MsgBlock } from '../MsgBlock';
import { CharsTable } from '../CharsTable';
import { CharactersContext } from '../../features';

export function CharsResult() {
  const context = useContext(CharactersContext);
  const characters = context.characters;

  return !characters?.length ? (
    <MsgBlock
      title="No characters found 🕵️‍♀️"
      msg="Try adjusting your search, maybe a typo snuck in?"
    />
  ) : (
    <CharsTable />
  );
}
