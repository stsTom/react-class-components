import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import { ItemCard } from '../ItemCard/ItemCard';

export function ItemsContainer() {
  const { isLoading, data: items, errorMessage } = useContext(SearchContext);

  return (
    <main aria-busy={isLoading}>
      {!isLoading &&
        !errorMessage &&
        items.map((item) => (
          <ItemCard key={item.id} title={item.title} details={item.details} />
        ))}

      {errorMessage && <h3>{errorMessage}</h3>}
    </main>
  );
}
