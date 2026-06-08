import { useEffect, useRef } from 'react';
import { Portal } from './Portal';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function Modal({ isOpen, handleClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) handleClose();
  };

  return (
    <Portal wrapperId="modalPortal">
      {isOpen && (
        <dialog ref={modalRef} onClick={handleClick} open>
          <article>
            <header>
              I'm your modal!
              <button rel="prev" onClick={handleClose} />
            </header>
          </article>
        </dialog>
      )}
    </Portal>
  );
}
