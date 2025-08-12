'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const App = dynamic(() => import('../../src/app/App'), { ssr: false });

type Props = {
  children: ReactNode;
};

export function ClientOnly({ children }: Props) {
  return <App>{children}</App>;
}
