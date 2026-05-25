/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NavMenu } from '../../components/NavMenu/NavMenu';
import { Search } from '../../components/Search/Search';
import { ErrorBoundary } from '../../utils/ErrorBoundary';
import { useSelectionStore } from '../../store/useSelectionStore';
import { SelectionFlyout } from '../../components/SelectionFlyout/SelectionFlyout';

export const Route = createFileRoute('/_searchable')({
  component: RouteComponent,
});

function RouteComponent() {
  const isSelected = useSelectionStore((s) => s.selectedItems).length > 0;

  return (
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

      <footer>{isSelected && <SelectionFlyout />}</footer>
    </ErrorBoundary>
  );
}
