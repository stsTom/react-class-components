import React, { useEffect, useRef, useState } from 'react';
import { useSearchStore, useMovieSearch } from '../../store';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const { getLastRequest, setLastRequest } = useLocalStorage();
  const setPage = useSearchStore((s) => s.setPage);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const lastRequest = getLastRequest();
    if (lastRequest && inputRef.current) {
      inputRef.current.value = lastRequest;
    }
  }, [getLastRequest]);

  useMovieSearch({
    search: searchQuery,
    page: 0,
    enabled: Boolean(searchQuery),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search')?.toString().trim() ?? '';

    if (searchRequest !== '') {
      setLastRequest(searchRequest);
      setPage(0);
      setSearchQuery(searchRequest);
    }
  };

  return (
    <form role="search" className="no-pico-search" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit">Search</button>
      <ErrorTrigger />
    </form>
  );
}
