import { useModalStore } from '../../store/useModalStore';

export function ModalButton() {
  const setIsOpen = useModalStore((s) => s.setIsOpen);

  return (
    <button className="contrast" onClick={() => setIsOpen()}>
      Modal
    </button>
  );
}
