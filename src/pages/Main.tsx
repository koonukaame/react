import { Button, Modal } from '@shared';
import { createPortal } from 'react-dom';
import { Form } from '@components';
import { useState } from 'react';

export const Main = () => {
  const [showModal, setShowModal] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);

  return (
    <main className="box-border h-screen max-w p-6 bg-neutral-900">
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <Button
          text="Uncontrolled Form"
          onClick={() => setShowModal('uncontrolled')}
        ></Button>
        <Button
          text="Controlled Form"
          onClick={() => setShowModal('controlled')}
        ></Button>
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
