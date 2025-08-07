import { Spinner } from '@components';
import { CharacterDetails, useGetCharacterQuery } from '@entities';
import { ErrorMsgBlock, MsgBlock } from '@shared';
import { useParams } from 'react-router';

export const CharacterWidget = () => {
  const { uid } = useParams();
  const {
    data: character,
    isFetching,
    isError,
    error,
  } = useGetCharacterQuery(uid ?? '');

  if (isFetching) {
    return (
      <div className="relative flex-grow">
        <Spinner isFullScreen={false} />
      </div>
    );
  }

  if (!character) {
    return MsgBlock({
      title: 'Character was not found',
      msg: 'Please choose another character',
    });
  }

  if (isError && error) {
    console.log(error);
    const cases = [
      ['FETCH_ERROR', 'Something is wrong with the server response'],
      ['TIMEOUT_ERROR', 'Server timeout'],
      ['PARSING_ERROR', 'Something went wrong while reading data.'],
    ] as const;

    for (const [status, title] of cases) {
      return ErrorMsgBlock(error, status, title);
    }

    if ('status' in error && typeof error.status === 'number') {
      return ErrorMsgBlock(
        error,
        error.status,
        `Response failed with status ${error.status}`
      );
    }
  }

  return <CharacterDetails character={character} />;
};
