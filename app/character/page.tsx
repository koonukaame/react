import { ReactNode } from 'react';
import { Main } from '../../src/pages';

type Props = {
  children: ReactNode;
};

export default function CharacterPage({ children }: Props) {
  return <Main>{children}</Main>;
}
