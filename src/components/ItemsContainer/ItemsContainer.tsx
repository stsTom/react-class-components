import { useSearchStore, useMovieSearch } from '../../store';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ItemCard } from '../ItemCard/ItemCard';

export function ItemsContainer() {
  const items = useSearchStore((s) => s.items);
  const pagesCount = useSearchStore((s) => s.pagesCount);
  const errorMessage = useSearchStore((s) => s.errorMessage);
  const currentPage = useSearchStore((s) => s.currentPage);
  const setPage = useSearchStore((s) => s.setPage);

  const { getLastRequest } = useLocalStorage();
  const search = getLastRequest();

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
            {Array.from({ length: pagesCount }, (_, i: number) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                disabled={i === currentPage}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {errorMessage && <h3>{errorMessage}</h3>}
    </main>
  );
}
