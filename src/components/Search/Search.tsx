import React, { useState } from 'react';
import { useSearchStore, useMovieSearch } from '../../store';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const { getLastRequest, setLastRequest } = useLocalStorage();
  const setPage = useSearchStore((s) => s.setPage);

  const [search, setSearch] = useState(getLastRequest);

  useMovieSearch({
    search,
    page: 0,
    enabled: Boolean(search),
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search')?.toString().trim() ?? '';

    if (searchRequest !== search) {
      setLastRequest(searchRequest);
      setPage(0);
      setSearch(searchRequest);
    }
  };

  return (
    <form role="search" className="no-pico-search" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        defaultValue={getLastRequest()}
        placeholder="Search"
      />
      <button type="submit">Search</button>
      <ErrorTrigger />
    </form>
  );
}
