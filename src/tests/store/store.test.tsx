import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../../components/Search/Search';
import { ItemsContainer } from '../../components/ItemsContainer/ItemsContainer';
import * as searchEngine from '../../utils/searchEngine';
import { useSearchStore } from '../../store';

const mockItems = [
  { id: '1', title: 'Star Trek', details: '1979-12-07' },
  { id: '2', title: 'Star Trek II', details: '1982-06-04' },
];

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  // Reset store to initial state between tests to prevent state leaking
  useSearchStore.setState({
    items: [],
    pagesCount: 0,
    currentPage: 0,
    isLoading: true,
    errorMessage: null,
  });
});

describe('useSearchStore', () => {
  it('sets isLoading to true while fetching data', async () => {
    vi.spyOn(searchEngine, 'fetchData').mockImplementation(
      () => new Promise(() => {})
    );

    const user = userEvent.setup();

    render(
      <>
        <Search />
        <ItemsContainer />
      </>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
  });

  it('sets isLoading to false and populates data after findItems resolves', async () => {
    vi.spyOn(searchEngine, 'fetchData').mockResolvedValue({
      movies: mockItems,
      pagesCount: 1,
    });

    const user = userEvent.setup();

    render(
      <>
        <Search />
        <ItemsContainer />
      </>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() => {
      expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false');
    });

    expect(screen.getByText('Star Trek')).toBeInTheDocument();
    expect(screen.getByText('Star Trek II')).toBeInTheDocument();
  });

  it('sets errorMessage when findItems rejects', async () => {
    vi.spyOn(searchEngine, 'fetchData').mockRejectedValue(
      new Error('Network Error')
    );

    const user = userEvent.setup();

    render(
      <>
        <Search />
        <ItemsContainer />
      </>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
  });
});

describe('LocalStorage interactions', () => {
  it('calls findItems with lastRequest from localStorage on mount', async () => {
    const findItems = vi.fn();
    localStorage.setItem('lastRequest', 'Star Trek');

    // Inject a mock findItems directly into the store
    useSearchStore.setState({ findItems });

    render(<Search />);

    await waitFor(() => {
      expect(findItems).toHaveBeenCalledWith('Star Trek', 0);
    });
  });

  it('saves the search query to localStorage on submit', async () => {
    const user = userEvent.setup();

    useSearchStore.setState({ findItems: vi.fn() });

    render(<Search />);

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(localStorage.getItem('lastRequest')).toBe('Star Trek');
  });

  it('does not call findItems when query matches lastRequest in localStorage', async () => {
    const findItems = vi.fn();
    const user = userEvent.setup();
    localStorage.setItem('lastRequest', 'Star Trek');

    useSearchStore.setState({ findItems });

    render(<Search />);

    await waitFor(() => expect(findItems).toHaveBeenCalledWith('Star Trek', 0));
    findItems.mockClear();

    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(findItems).not.toHaveBeenCalled();
  });
});
