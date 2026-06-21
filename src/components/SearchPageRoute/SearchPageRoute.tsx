"use client";

import { useEffect } from 'react';
import { useSearchStore } from '../../store';
import { SearchPage } from '../SearchPage/SearchPage';

interface SearchPageRouteProps {
  pageNumber: number;
}

export function SearchPageRoute({ pageNumber }: SearchPageRouteProps) {
  const setPage = useSearchStore((s) => s.setPage);

  useEffect(() => {
    const normalizedPage = Number.isFinite(pageNumber) && pageNumber >= 1 ? pageNumber : 1;
    setPage(normalizedPage - 1);
  }, [pageNumber, setPage]);

  return <SearchPage />;
}
