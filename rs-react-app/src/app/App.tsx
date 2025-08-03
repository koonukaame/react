import { RouterProvider } from 'react-router';
import { router } from './routers';
import { ErrorBoundary } from '@components';
import { StoreProvider, ThemeProvider } from './providers';

export const App = () => {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};
