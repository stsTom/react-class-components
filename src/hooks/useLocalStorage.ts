import { useCallback } from 'react';

export function useLocalStorage() {
  const getItem = useCallback(
    () => localStorage.getItem('lastRequest') ?? '',
    []
  );

  const setItem = useCallback(
    (value: string) => localStorage.setItem('lastRequest', value),
    []
  );

  return { getItem, setItem };
}
