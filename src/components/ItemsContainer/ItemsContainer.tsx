"use client";

import { useSyncExternalStore, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '../../store';
import { ItemCard } from '../ItemCard/ItemCard';
import { Pagination } from '../Pagination/Pagination';

function subscribe() { return () => {}; }

interface ItemsContainerProps {
  pageNumber: number;
}

export function ItemsContainer({ pageNumber }: ItemsContainerProps) {
  const items = useSearchStore((s) => s.items);
  const pagesCount = useSearchStore((s) => s.pagesCount);
  const errorMessage = useSearchStore((s) => s.errorMessage);
  const isFetching = useSearchStore((s) => s.isFetching);

  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && pagesCount > 0 && pageNumber > pagesCount) {
      router.replace(`/search/${pagesCount}`);
    }
  }, [isFetching, pagesCount, pageNumber]);

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
          <Pagination pagesCount={pagesCount} />
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