import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
      tabIndex={-1}
      ref={ref}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
