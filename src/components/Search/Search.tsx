"use client";

import React, { memo, useState } from 'react';
import { useSearchStore } from '../../store';
import { useMovieSearch } from '../../store';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useParams, useRouter } from 'next/navigation';

const Search = memo(function Search() {
  const { getLastRequest, setLastRequest } = useLocalStorage();
  const setPage = useSearchStore((s) => s.setPage);
  const [searchQuery, setSearchQuery] = useState(() => getLastRequest() || '');

  const { page } = useParams();
  const pageNumber = Number(page) || 1;

  const router = useRouter()

  useMovieSearch({
    search: searchQuery,
    page: pageNumber,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      setLastRequest(trimmedQuery);
      setPage(pageNumber);
      setSearchQuery(trimmedQuery);
    }
    router.push('/search/1')
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
})

export default Search