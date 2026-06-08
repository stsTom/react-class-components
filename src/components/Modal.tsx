import { useEffect, useRef } from 'react';
import { Portal } from './Portal';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export function Modal({ isOpen, closeModal }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? closeModal() : null;

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [closeModal]);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) closeModal();
  };

  return (
    <Portal wrapperId="modalPortal">
      {isOpen && (
        <dialog ref={modalRef} onClick={handleClick} open>
          <article>
            <header>
              I'm your modal!
              <button rel="prev" onClick={closeModal} />
            </header>
          </article>
        </dialog>
      )}
    </Portal>
  );
}