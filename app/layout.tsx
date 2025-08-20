import { ReactNode } from 'react';
import './[locale]/globals.css';

type Props = {
  children: ReactNode;
};

export default async function NotFoundLayout({ children }: Props) {
  return <div>{children}</div>;
}
