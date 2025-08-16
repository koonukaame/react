'use client';

import { CharacterDetails, useGetCharacterQuery } from '@entities';
import { MsgBlock } from '@shared';
import { Spinner } from '@components';
import { useParams } from 'next/navigation';

export default function CharacterPage() {
  const { uid } = useParams();
  const uidString = Array.isArray(uid) ? uid[0] : uid;

  const {
    data: character,
    isFetching,
    isError,
    isSuccess,
  } = useGetCharacterQuery(uidString ?? '', { skip: !uidString });

  if (!uid) {
    return null;
  }

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
}
