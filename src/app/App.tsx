import { Main } from '@pages';
import { StoreProvider } from './providers/StoreProvider';

export const App = () => {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
};
