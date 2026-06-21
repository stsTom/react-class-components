"use client";

import React, { PropsWithChildren } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { SearchPageRoute } from '../../../src/components/SearchPageRoute/SearchPageRoute';

interface PageLayoutProps {
  params: Promise<{
    page: string;
  }>;
}

export default function PageLayout({ children, params }: PropsWithChildren<PageLayoutProps>) {
  const resolvedParams = React.use(params);
  const rawPage = Number(resolvedParams.page);
  const pageNumber = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;

  const selectedSegment = useSelectedLayoutSegment();
  const hasItemSelected = selectedSegment !== null;

  if (!hasItemSelected) {
    return (
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <SearchPageRoute pageNumber={pageNumber} />
      </div>
    );
  }

  return (
    <div className="grid" style={{ minHeight: '100vh' }}>
      <div style={{ minWidth: '40vw' }}>
        <SearchPageRoute pageNumber={pageNumber} />
      </div>
      <div>{children}</div>
    </div>
  );
}