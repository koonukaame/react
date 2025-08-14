import { ReactNode } from 'react';
import { Main } from '../../src/pages';
import { StoreProvider } from 'src/app/providers';
import { getInitialCharacters } from '@entities';

type Props = {
  children: ReactNode;
};

export default async function CharacterLayout({ children }: Props) {
  const result = await getInitialCharacters();
  if (!result.ok) {
    return;
  }

  return (
    <StoreProvider>
      <Main initialData={result.data}>{children}</Main>
    </StoreProvider>
  );
}
