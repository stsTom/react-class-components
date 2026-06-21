"use client";

import { useState, useSyncExternalStore } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ItemCard } from '../ItemCard/ItemCard';
import { useMovieSearch, useSearchStore } from '../../store';
import { Pagination } from '../Pagination/Pagination';

function subscribe() { return () => {}; }

export function ItemsContainer() {
  const items = useSearchStore((s) => s.items);
  const pagesCount = useSearchStore((s) => s.pagesCount);
  const errorMessage = useSearchStore((s) => s.errorMessage);
  const currentPage = useSearchStore((s) => s.currentPage);
  
  const { getLastRequest } = useLocalStorage();
  const [search] = useState(() => getLastRequest());
  
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  
  const { isFetching } = useMovieSearch({
    search,
    page: currentPage,
    enabled: Boolean(search),
  });
  
  if (!mounted) return null;

  return (
    <main aria-busy={isFetching}>
      {!isFetching && !errorMessage && (
        <>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              movieId={item.id}
              title={item.title}
              details={item.details}
            />
          ))}

          <Pagination currentPage={currentPage} pagesCount={pagesCount}/>
        </>
      )}

      {errorMessage && (
        <div role="alert">
          <h3>{errorMessage}</h3>
        </div>
      )}
    </main>
  );
}
