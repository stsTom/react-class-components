"use client";

import { SearchPage } from '../SearchPage/SearchPage';

interface SearchPageRouteProps {
  pageNumber: number;
}

export function SearchPageRoute({ pageNumber }: SearchPageRouteProps) {
  return <SearchPage pageNumber={pageNumber} />;
}