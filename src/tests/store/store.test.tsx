import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { Search } from '../../components/Search/Search';
import { ItemsContainer } from '../../components/ItemsContainer/ItemsContainer';
import { useSearchStore } from '../../store';

const mockFetchData = vi.fn();

vi.mock('../../utils/searchEngine', () => ({
  fetchData: (...args: unknown[]) => mockFetchData(...args),
  fetchItemData: vi.fn(),
}));

const mockGetLastRequest = vi.fn().mockReturnValue('');
const mockSetLastRequest = vi.fn().mockImplementation((val: string) => {
  mockGetLastRequest.mockReturnValue(val);
});

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getLastRequest: mockGetLastRequest,
    setLastRequest: mockSetLastRequest,
  }),
}));

const mockItems = [
  { id: '1', title: 'Star Trek', details: '1979-12-07' },
  { id: '2', title: 'Star Trek II', details: '1982-06-04' },
];

function makeWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
}

afterEach(() => {
  vi.clearAllMocks();
  mockGetLastRequest.mockReturnValue('');
  useSearchStore.setState({
    items: [],
    pagesCount: 0,
    currentPage: 0,
    errorMessage: null,
  });
});

describe('Search + ItemsContainer integration', () => {
  it('marks main as busy while fetchData is in flight', async () => {
    mockFetchData.mockReturnValue(new Promise(() => {}));
    mockGetLastRequest.mockReturnValue('Star Trek');

    render(
      <>
        <Search />
        <ItemsContainer />
      </>,
      { wrapper: makeWrapper() }
    );

    await waitFor(() =>
      expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true')
    );
  });

  it('renders items and clears busy state after fetchData resolves', async () => {
    mockFetchData.mockResolvedValue({ movies: mockItems, pagesCount: 1 });
    const user = userEvent.setup();

    render(
      <>
        <Search />
        <ItemsContainer />
      </>,
      { wrapper: makeWrapper() }
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() =>
      expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false')
    );
    expect(screen.getByText('Star Trek')).toBeInTheDocument();
    expect(screen.getByText('Star Trek II')).toBeInTheDocument();
  });

  it('shows the error message when fetchData rejects', async () => {
    mockFetchData.mockRejectedValue(new Error('Network Error'));
    const user = userEvent.setup();

    render(
      <>
        <Search />
        <ItemsContainer />
      </>,
      { wrapper: makeWrapper() }
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() =>
      expect(screen.getByText('Network Error')).toBeInTheDocument()
    );
  });

  it('saves the search query to localStorage on submit', async () => {
    mockFetchData.mockResolvedValue({ movies: [], pagesCount: 0 });
    const user = userEvent.setup();

    render(
      <>
        <Search />
        <ItemsContainer />
      </>,
      { wrapper: makeWrapper() }
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(mockSetLastRequest).toHaveBeenCalledWith('Star Trek');
  });
});
