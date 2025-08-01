import { RouterProvider } from 'react-router';
import { router } from './routers';
import { ErrorBoundary } from '../components';
import { MainProviders } from './providers';

export const App = () => {
  return (
    <ErrorBoundary>
      <MainProviders>
        <RouterProvider router={router} />
      </MainProviders>
    </ErrorBoundary>
  );
};
