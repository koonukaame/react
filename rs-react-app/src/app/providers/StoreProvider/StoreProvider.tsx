import type { ReactNode } from 'react';
import { mainStore } from '../../stores';
import { Provider } from 'react-redux';

type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={mainStore}>{children}</Provider>;
};
