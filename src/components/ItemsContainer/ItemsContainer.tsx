import { Component, type ContextType } from 'react';
import SearchContext from '../../context/SearchContext';
import { ItemCard } from '../ItemCard/ItemCard';

export class ItemsContainer extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  render() {
    const isLoading = this.context.isLoading;
    const items = this.context.data;
    const errorMessage = this.context.errorMessage;

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
}
