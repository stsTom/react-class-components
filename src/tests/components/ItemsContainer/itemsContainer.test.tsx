import { render, screen } from '@testing-library/react';
import { ItemsContainer } from '../../../components/ItemsContainer/ItemsContainer';
import { useSearchStore } from '../../../store';

const mockItems = [
  { id: '1', title: 'Star Trek', details: 'Sci-fi series' },
  { id: '2', title: 'Star Wars', details: 'Space opera' },
];

afterEach(() => {
  useSearchStore.setState({
    items: [],
    pagesCount: 0,
    currentPage: 0,
    isLoading: true,
    errorMessage: null,
  });
});

describe('ItemsContainer', () => {
  it('removes all item cards when aria-busy is true', () => {
    useSearchStore.setState({ isLoading: true, items: mockItems });

    render(<ItemsContainer />);

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('Star Trek')).not.toBeInTheDocument();
    expect(screen.queryByText('Star Wars')).not.toBeInTheDocument();
  });
});
