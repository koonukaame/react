import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Startrack API</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
