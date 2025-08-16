import { ReactNode } from 'react';
import { Main } from '../../src/pages';
import { getInitialCharacters } from '@entities';

type Props = {
  children: ReactNode;
};

export default async function CharacterLayout({ children }: Props) {
  const result = await getInitialCharacters();
  if (!result.ok) {
    return;
  }

  return <Main initialData={result.data}>{children}</Main>;
}
