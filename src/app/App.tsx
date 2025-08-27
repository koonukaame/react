import { Main } from '@pages';
import { Provider } from 'react-redux';
import { store } from './stores';

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
