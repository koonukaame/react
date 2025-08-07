import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MsgBlock } from './MsgBlock';
import type { SerializedError } from '@reduxjs/toolkit/react';

export function ErrorMsgBlock(
  error: FetchBaseQueryError | SerializedError,
  status: FetchBaseQueryError['status'],
  title: string
) {
  if ('status' in error && error.status === status) {
    return <MsgBlock title={title} msg="Please try again in a bit!" />;
  }
  return null;
}
