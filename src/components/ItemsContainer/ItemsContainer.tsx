"use client";

import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ItemCard } from '../ItemCard/ItemCard';
import { useMovieSearch, useSearchStore } from '../../store';
import { Pagination } from '../Pagination/Pagination';

export function ItemsContainer() {
  const items = useSearchStore((s) => s.items);
  const pagesCount = useSearchStore((s) => s.pagesCount);
  const errorMessage = useSearchStore((s) => s.errorMessage);
  const currentPage = useSearchStore((s) => s.currentPage);

  const { getLastRequest } = useLocalStorage();
  const [search] = useState(() => getLastRequest());

  const { isFetching } = useMovieSearch({
    search,
    page: currentPage,
    enabled: Boolean(search),
  });

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
