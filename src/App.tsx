import { RouterProvider } from 'react-router';
import { router } from './app/routers';
import { ErrorBoundary } from '@components';
import { StoreProvider, ThemeProvider } from './app/providers';

const App: React.FC = () => {
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

export default App;
