import { ReactNode } from 'react';

type Props = {
  list: ReactNode;
  details: ReactNode;
};

export default function CharacterLayout({ list, details }: Props) {
  return (
    <div>
      <div>{list}</div>
      <div>{details}</div>
    </div>
  );
}
