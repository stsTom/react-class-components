/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NavMenu } from '../../components/NavMenu/NavMenu';
import { Search } from '../../components/Search/Search';
import { SearchProvider } from '../../context/SearchContext';
import { ErrorBoundary } from '../../utils/ErrorBoundary';
import { DetailsProvider } from '../../context/DetailsContext';

export const Route = createFileRoute('/_searchable')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SearchProvider>
      <DetailsProvider>
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
      </DetailsProvider>
    </SearchProvider>
  );
}
