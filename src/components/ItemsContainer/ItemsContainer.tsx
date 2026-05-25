import { useSearchStore } from '../../store';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ItemCard } from '../ItemCard/ItemCard';

export function ItemsContainer() {
  const isLoading = useSearchStore((s) => s.isLoading);
  const items = useSearchStore((s) => s.items);
  const pagesCount = useSearchStore((s) => s.pagesCount);
  const errorMessage = useSearchStore((s) => s.errorMessage);
  const currentPage = useSearchStore((s) => s.currentPage);
  const goToPage = useSearchStore((s) => s.goToPage);

  const { getLastRequest } = useLocalStorage();

  return (
    <main aria-busy={isLoading}>
      {!isLoading && !errorMessage && (
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
            {!errorMessage &&
              Array.from({ length: pagesCount }, (_, i: number) => (
                <button
                  key={i}
                  onClick={() => goToPage(getLastRequest(), i)}
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
