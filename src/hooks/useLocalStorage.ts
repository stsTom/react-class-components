import { useCallback } from 'react';

export function useLocalStorage() {
  const getLastRequest = useCallback(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('lastRequest') ?? '';
  }, []);

  const setLastRequest = useCallback((value: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lastRequest', value);
  }, []);

  return { getLastRequest, setLastRequest };
}
