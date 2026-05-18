/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NavMenu } from '../components/NavMenu/NavMenu';
import { Search } from '../components/Search/Search';
import { SearchProvider } from '../context/SearchContext';
import { ErrorBoundary } from '../utils/ErrorBoundary';

export const Route = createFileRoute('/_searchable')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <SearchProvider>
        <ErrorBoundary>
          <header>
            <nav>
              <ul>
                <li>
                  <Search />
                </li>
              </ul>
              <ul>
                <NavMenu />
              </ul>
            </nav>
          </header>

          <Outlet />
        </ErrorBoundary>
      </SearchProvider>
    </main>
  );
}
