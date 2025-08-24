import { useRef, type KeyboardEvent, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = ref.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      data-testid="overlay"
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
        data-testid="modal"
        tabIndex={-1}
        autoFocus={false}
        onKeyDown={handleKeyDown}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};
