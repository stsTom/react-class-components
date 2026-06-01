import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { Search } from '../../../components/Search/Search';

vi.mock('../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../store')>();
  return {
    ...actual,
    useMovieSearch: vi.fn().mockReturnValue({ isFetching: false }),
  };
});

const mockSetLastRequest = vi.fn();
const mockGetLastRequest = vi.fn().mockReturnValue('');

vi.mock('../../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getLastRequest: mockGetLastRequest,
    setLastRequest: mockSetLastRequest,
  }),
}));

function makeWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
}

afterEach(() => {
  vi.clearAllMocks();
  mockGetLastRequest.mockReturnValue('');
});

describe('Search', () => {
  it('saves the search query to localStorage on submit', async () => {
    const user = userEvent.setup();

    render(<Search />, { wrapper: makeWrapper() });

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(mockSetLastRequest).toHaveBeenCalledWith('Star Trek');
  });

  it('does not call setLastRequest when query matches the current search', async () => {
    mockGetLastRequest.mockReturnValue('Star Trek');
    const user = userEvent.setup();

    render(<Search />, { wrapper: makeWrapper() });

    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(mockSetLastRequest).not.toHaveBeenCalled();
  });

  it('calls useMovieSearch with the submitted search term', async () => {
    const { useMovieSearch } = await import('../../../store');
    const user = userEvent.setup();

    render(<Search />, { wrapper: makeWrapper() });

    await user.type(screen.getByPlaceholderText('Search'), 'Interstellar');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(useMovieSearch).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'Interstellar', page: 0 })
    );
  });
});
