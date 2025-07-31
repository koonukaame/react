import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ErrorBoundary } from '../components';

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
