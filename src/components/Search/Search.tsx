import React, { useEffect } from 'react';
import { useSearchStore } from '../../store';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const firstPage = 0;

  const findItems = useSearchStore((s) => s.findItems);
  const simulateError = useSearchStore((s) => s.simulateError);
  const { getLastRequest, setLastRequest } = useLocalStorage();

  useEffect(() => {
    findItems(getLastRequest(), firstPage);
  }, [findItems, getLastRequest]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search')?.toString().trim() ?? '';

    if (searchRequest !== getLastRequest()) {
      setLastRequest(searchRequest);
      await findItems(searchRequest, firstPage);
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
      <button id="error-btn" className="outline" onClick={simulateError}>
        Simulate Backend Error
      </button>
      <ErrorTrigger />
    </form>
  );
}
