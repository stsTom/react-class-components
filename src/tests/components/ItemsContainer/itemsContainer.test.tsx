import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { ItemsContainer } from '../../../components/ItemsContainer/ItemsContainer';
import { useSearchStore } from '../../../store';

const mockUseMovieSearch = vi.fn();

vi.mock('../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../store')>();
  return {
    ...actual,
    useMovieSearch: (...args: unknown[]) => mockUseMovieSearch(...args),
  };
});

vi.mock('../../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getLastRequest: vi.fn().mockReturnValue('Star Trek'),
  }),
}));

const mockItems = [
  { id: '1', title: 'Star Trek', details: 'Sci-fi series' },
  { id: '2', title: 'Star Wars', details: 'Space opera' },
];

function makeWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
}

function fakeQuery(overrides: Partial<UseQueryResult>): UseQueryResult {
  return {
    isFetching: false,
    refetch: vi.fn(),
    ...overrides,
  } as UseQueryResult;
}

afterEach(() => {
  useSearchStore.setState({
    items: [],
    pagesCount: 0,
    currentPage: 0,
    errorMessage: null,
  });
  vi.clearAllMocks();
});

describe('ItemsContainer', () => {
  it('hides item cards and marks main as busy while fetching', () => {
    mockUseMovieSearch.mockReturnValue(fakeQuery({ isFetching: true }));
    useSearchStore.setState({ items: mockItems });

    render(<ItemsContainer />, { wrapper: makeWrapper() });

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('Star Trek')).not.toBeInTheDocument();
    expect(screen.queryByText('Star Wars')).not.toBeInTheDocument();
  });

  it('renders item cards after fetching completes', () => {
    mockUseMovieSearch.mockReturnValue(fakeQuery({ isFetching: false }));
    useSearchStore.setState({ items: mockItems, errorMessage: null });

    render(<ItemsContainer />, { wrapper: makeWrapper() });

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'false');
    expect(screen.getByText('Star Trek')).toBeInTheDocument();
    expect(screen.getByText('Star Wars')).toBeInTheDocument();
  });

  it('shows error message and retry button when errorMessage is set', () => {
    mockUseMovieSearch.mockReturnValue(fakeQuery({ isFetching: false }));
    useSearchStore.setState({ errorMessage: 'Network Error' });

    render(<ItemsContainer />, { wrapper: makeWrapper() });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });
});
