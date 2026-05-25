/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { SearchPage } from '../../pages/searchPage';

export const Route = createFileRoute('/_searchable/_split')({
  component: MainPage,
});

export function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="grid">
      <div
        onClick={() => {
          navigate({ to: '/' });
        }}
      >
        <SearchPage />
      </div>
      <Outlet />
    </div>
  );
}
