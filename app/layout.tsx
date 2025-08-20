import { ReactNode } from 'react';
import './[locale]/globals.css';

type Props = {
  children: ReactNode;
};

export default async function NotFoundLayout({ children }: Props) {
  return (
    <html>
      <head>
        <title>Startrack API</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
