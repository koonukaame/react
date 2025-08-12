import type { ReactNode } from 'react';
import { Layout } from '../src/pages/Layout/Layout';
import App from '../src/app/App';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Startrack API</title>
      </head>
      <body>
        <App>
          <Layout>{children}</Layout>
        </App>
      </body>
    </html>
  );
}
