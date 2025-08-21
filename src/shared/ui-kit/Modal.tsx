import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Modal = ({ children }: Props) => {
  return <dialog>{children}</dialog>;
};
