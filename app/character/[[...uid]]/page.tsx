'use client';

import { CharacterDetails, useGetCharacterQuery } from '@entities';
import { MsgBlock } from '@shared';
import { Spinner } from '@components';

type Props = {
  params: { uid: string };
};

export default function CharacterPage({ params }: Props) {
  const { uid } = params;

  const {
    data: character,
    isFetching,
    isError,
    isSuccess,
  } = useGetCharacterQuery(uid ?? '', { skip: !uid });

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
