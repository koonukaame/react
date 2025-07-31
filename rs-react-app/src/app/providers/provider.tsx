import type { ReactNode } from 'react';
import { mainStore } from '../stores';
import { Provider } from 'react-redux';

type Props = {
  children: ReactNode;
};

export const MainProviders = ({ children }: Props) => {
  return <Provider store={mainStore}>{children}</Provider>;
};
