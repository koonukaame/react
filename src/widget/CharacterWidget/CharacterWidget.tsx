'use client';

import { Spinner } from '@components';
import { CharacterDetails, useGetCharacterQuery } from '@entities';
import { MsgBlock } from '@shared';
import { useParams } from 'next/navigation';

export const CharacterWidget = () => {
  const { uid } = useParams<{ uid: string }>();
  const {
    data: character,
    isFetching,
    isError,
    isSuccess,
  } = useGetCharacterQuery(uid ?? '');

  return (
    <div className="relative flex-grow">
      {isFetching ? (
        <Spinner isFullScreen={false} />
      ) : isError ? (
        <MsgBlock
          title="An unexpected error has occured"
          msg="Please try again in a bit!"
        />
      ) : isSuccess && character ? (
        <CharacterDetails character={character} />
      ) : (
        <MsgBlock
          title="Character was not found"
          msg="Please choose another character"
        />
      )}
    </div>
  );
};
