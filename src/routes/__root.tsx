/* eslint-disable react-refresh/only-export-components */

import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@picocss/pico/css/pico.min.css';
import '../index.css';
import { Modal } from '../components/Modal/Modal';
import { useModalStore } from '../store/useModalStore';

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
  const isOpen = useModalStore((s) => s.isOpen);
  const setIsOpen = useModalStore((s) => s.setIsOpen);

  return (
    <main>
      <Outlet />
      <Modal isOpen={isOpen} handleClose={() => setIsOpen()} />
    </main>
  );
}
