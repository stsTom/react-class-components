/* eslint-disable react-refresh/only-export-components */

import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import '@picocss/pico/css/pico.min.css';
import '../index.css';

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
