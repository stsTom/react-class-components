/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NavMenu } from '../components/NavMenu/NavMenu';

export const Route = createFileRoute('/_default')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <header>
        <nav>
          <ul>
            <NavMenu />
          </ul>
        </nav>
      </header>

      <Outlet />
    </main>
  );
}
