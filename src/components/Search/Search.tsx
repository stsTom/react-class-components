import React, { useContext, useEffect } from 'react';
import SearchContext from '../../context/SearchContext';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const { findItems, simulateError } = useContext(SearchContext);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    findItems(getItem());
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search')?.toString().trim() ?? '';

    if (searchRequest !== getItem()) {
      setItem(searchRequest);
      await findItems(searchRequest);
    }
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        defaultValue={getItem()}
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
