'use client';

import { useRef, type ReactNode } from 'react';
import { type AppStore, makeStore } from '../../stores';
import { Provider } from 'react-redux';

type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
