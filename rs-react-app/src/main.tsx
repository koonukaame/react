import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components';
import { RouterProvider } from 'react-router';
import { router } from './app/routes.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
