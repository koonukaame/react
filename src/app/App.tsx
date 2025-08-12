'use client';

import { ErrorBoundary } from '@components';
import { StoreProvider, ThemeProvider } from './providers';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default App;
