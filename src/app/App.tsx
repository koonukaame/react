import { Spinner } from '@components';
import { Main } from '@pages';
import { Suspense } from 'react';

export const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
  );
};
