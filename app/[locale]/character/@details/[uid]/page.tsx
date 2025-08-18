'use client';

import {
  CharacterDetails,
  useGetCharacterQuery,
} from '../../../../../src/entities';
import { MsgBlock } from '../../../../../src/shared';
import { Spinner } from '../../../../../src/components';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function DetailsPage() {
  const { uid } = useParams();
  const uidString = Array.isArray(uid) ? uid[0] : uid;
  const tError = useTranslations('msgBlock.detailsMsgs.error');
  const tNotFound = useTranslations('msgBlock.detailsMsgs.notFound');

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
        <MsgBlock title={tError('title')} msg={tError('msg')} />
      ) : isSuccess && character ? (
        <CharacterDetails character={character} />
      ) : (
        <MsgBlock title={tNotFound('title')} msg={tNotFound('msg')} />
      )}
    </div>
  );
}
