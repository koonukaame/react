import { ErrorBoundary } from '@components';
import { StoreProvider, ThemeProvider } from './providers';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <NextIntlClientProvider>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
};

export default App;
