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

  if (isFetching) {
    return (
      <div className="relative flex-grow">
        <Spinner isFullScreen={false} />
      </div>
    );
  }

  if (!character) {
    return (
      <MsgBlock
        title="Character was not found"
        msg="Please choose another character"
      />
    );
  }

  if (isError) {
    return (
      <MsgBlock
        title="An unexpected error has occured"
        msg="Please try again in a bit!"
      />
    );
  }

  return <CharacterDetails character={character} />;
};
