import { Button, Modal, useMainSelector } from '@shared';
import { createPortal } from 'react-dom';
import { Card, UncontrolledForm, ControlledForm } from '@components';
import { useEffect, useState } from 'react';

export const Main = () => {
  const [showModal, setShowModal] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);

  const forms = useMainSelector((state) => state.forms);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  useEffect(() => {
    if (forms.length > 0) {
      const newIndex = forms.length - 1;
      setHighlightIndex(newIndex);

      const timer = setTimeout(() => setHighlightIndex(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [forms]);

  return (
    <main
      data-testid="main"
      className="box-border h-screen max-w p-6 bg-neutral-900 overflow-y-auto"
    >
      <div className="flex flex-col gap-6 items-center">
        <div className="flex gap-4">
          <Button
            text="Uncontrolled Form"
            onClick={() => setShowModal('uncontrolled')}
            data-testid="uncontrolled-button"
          />
          <Button
            text="Controlled Form"
            onClick={() => setShowModal('controlled')}
            data-testid="controlled-button"
          />
        </div>

        <div className="w-full gap-5 flex items-start flex-wrap">
          {forms.map((form, i) => (
            <Card key={i} form={form} highlight={highlightIndex === i} />
          ))}
        </div>

        {showModal &&
          createPortal(
            <Modal onClose={() => setShowModal(null)}>
              {showModal === 'uncontrolled' ? (
                <UncontrolledForm onClose={() => setShowModal(null)} />
              ) : (
                <ControlledForm onClose={() => setShowModal(null)} />
              )}
            </Modal>,
            document.body
          )}
      </div>
    </main>
  );
};
