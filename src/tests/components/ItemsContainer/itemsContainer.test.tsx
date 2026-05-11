import { render, screen } from '@testing-library/react';
import { ItemsContainer } from '../../../components/ItemsContainer/ItemsContainer';
import SearchContext from '../../../context/SearchContext';

const mockItems = [
  { id: '1', title: 'Star Trek', details: 'Sci-fi series' },
  { id: '2', title: 'Star Wars', details: 'Space opera' },
];

describe('ItemsContainer', () => {
  it('removes all item cards when aria-busy is true', () => {
    render(
      <SearchContext.Provider
        value={{
          isLoading: true,
          data: mockItems,
          errorMessage: '',
          findItems: vi.fn(),
          simulateError: vi.fn(),
        }}
      >
        <ItemsContainer />
      </SearchContext.Provider>
    );

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('Star Trek')).not.toBeInTheDocument();
    expect(screen.queryByText('Star Wars')).not.toBeInTheDocument();
  });
});
