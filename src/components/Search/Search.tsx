import React, { useContext, useEffect } from 'react';
import SearchContext from '../../context/SearchContext';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const firstPage = 0;

  const { findItems, simulateError } = useContext(SearchContext);
  const { getLastRequest, setLastRequest } = useLocalStorage();

  useEffect(() => {
    findItems(getLastRequest(), firstPage);
  }, [findItems, getLastRequest]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search')?.toString().trim() ?? '';

    if (searchRequest !== getLastRequest()) {
      setLastRequest(searchRequest);
      await findItems(searchRequest, firstPage);
    }
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        defaultValue={getLastRequest()}
        placeholder="Search"
      />
      <button type="submit">Search</button>
      <button id="error-btn" className="outline" onClick={simulateError}>
        Simulate Backend Error
      </button>
      <ErrorTrigger />
    </form>
  );
}
