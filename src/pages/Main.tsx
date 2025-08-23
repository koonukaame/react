import { Button, Modal } from '@shared';
import { createPortal } from 'react-dom';
import { Card, Form } from '@components';
import { useState } from 'react';

export const Main = () => {
  const [showModal, setShowModal] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);

  return (
    <main className="box-border h-screen max-w p-6 bg-neutral-900">
      <div className="flex justify-center items-start h-full gap-5">
        <div className="flex flex-col justify-end items-center h-full gap-5">
          <Card type="uncontrolled" />
          <Button
            text="Uncontrolled Form"
            onClick={() => setShowModal('uncontrolled')}
          />
        </div>
        <div className="flex flex-col justify-end items-center h-full gap-5">
          <Card type="controlled" />
          <Button
            text="Controlled Form"
            onClick={() => setShowModal('controlled')}
          />
        </div>

        {showModal &&
          createPortal(
            <Modal onClose={() => setShowModal(null)}>
              <Form
                isControlled={showModal === 'controlled'}
                onClose={() => setShowModal(null)}
              />
            </Modal>,
            document.body
          )}
      </div>
    </main>
  );
};
