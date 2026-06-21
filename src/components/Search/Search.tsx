"use client"

import React, { useState } from 'react';
import { useSearchStore, useMovieSearch } from '../../store';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const { getLastRequest, setLastRequest } = useLocalStorage();
  const setPage = useSearchStore((s) => s.setPage);

  const [searchQuery, setSearchQuery] = useState(() => getLastRequest() || '');

  useMovieSearch({
    search: searchQuery,
    page: 0,
    enabled: true,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery !== '') {
      setLastRequest(trimmedQuery);
      setPage(0);
      setSearchQuery(trimmedQuery);
    }
  };

  return (
    <form role="search" className="no-pico-search" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
      <ErrorTrigger />
    </form>
  );
}
