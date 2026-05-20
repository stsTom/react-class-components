/* eslint-disable react-refresh/only-export-components */

import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@picocss/pico/css/pico.min.css';
import '../index.css';

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
