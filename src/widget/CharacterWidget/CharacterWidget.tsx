import { Spinner } from '@components';
import { CharacterDetails, useGetCharacterQuery } from '@entities';
import { MsgBlock } from '@shared';
import { useParams } from 'react-router';

export const CharacterWidget = () => {
  const { uid } = useParams();
  const {
    data: character,
    isFetching,
    isError,
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
      ) : !character ? (
        <MsgBlock
          title="Character was not found"
          msg="Please choose another character"
        />
      ) : (
        <CharacterDetails character={character} />
      )}
    </div>
  );
};
