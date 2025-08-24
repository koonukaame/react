import type { ReactNode } from 'react';
import { formsStore } from '../../stores';
import { Provider } from 'react-redux';

type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={formsStore}>{children}</Provider>;
};
