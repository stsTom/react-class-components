import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import { ItemCard } from '../ItemCard/ItemCard';

export function ItemsContainer() {
  const { isLoading, items, pagesCount, errorMessage, goToPage, currentPage } =
    useContext(SearchContext);

  return (
    <main aria-busy={isLoading}>
      {!isLoading &&
        !errorMessage &&
        items.map((item) => (
          <ItemCard key={item.id} title={item.title} details={item.details} />
        ))}

      <div role="group">
        {!errorMessage &&
          Array.from({ length: pagesCount }, (_, i: number) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              disabled={i === currentPage}
            >
              {i + 1}
            </button>
          ))}
      </div>

      {errorMessage && <h3>{errorMessage}</h3>}
    </main>
  );
}
