import { useCallback } from 'react';

export function useLocalStorage() {
  const getLastRequest = useCallback(
    () => localStorage.getItem('lastRequest') ?? '',
    []
  );

  const setLastRequest = useCallback(
    (value: string) => localStorage.setItem('lastRequest', value),
    []
  );

  return { getLastRequest, setLastRequest };
}
