"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ItemCard } from '../ItemCard/ItemCard';
import { useMovieSearch, useSearchStore } from '../../store';

export function ItemsContainer() {
  const items = useSearchStore((s) => s.items);
  const pagesCount = useSearchStore((s) => s.pagesCount);
  const errorMessage = useSearchStore((s) => s.errorMessage);
  const currentPage = useSearchStore((s) => s.currentPage);

  const { getLastRequest } = useLocalStorage();
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Read localStorage only after mount to keep SSR and client render consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(getLastRequest());
  }, [getLastRequest]);

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

          <div role="group">
            {Array.from({ length: pagesCount }, (_, i: number) => {
              const pageNumber = i + 1;
              return i === currentPage ? (
                <button key={i} type="button" disabled>
                  {pageNumber}
                </button>
              ) : (
                <Link key={i} href={`/${pageNumber}`}>
                  <button type="button">{pageNumber}</button>
                </Link>
              );
            })}
          </div>
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
