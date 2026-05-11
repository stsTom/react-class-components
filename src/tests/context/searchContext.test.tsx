import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchProvider } from '../../context/SearchContext';
import { Search } from '../../components/Search/Search';
import * as searchEngine from '../../utils/searchEngine';
import { ItemsContainer } from '../../components/ItemsContainer/ItemsContainer';

const mockItems = [
  { id: '1', title: 'Star Trek', details: '1979-12-07' },
  { id: '2', title: 'Star Trek II', details: '1982-06-04' },
];

describe('SearchContext', () => {
  it('sets isLoading to true while fetching data', async () => {
    vi.spyOn(searchEngine, 'fetchData').mockImplementation(
      () => new Promise(() => {})
    );

    const user = userEvent.setup();

    render(
      <SearchProvider>
        <Search />
        <ItemsContainer />
      </SearchProvider>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('sets isLoading to false and populates data after findItems resolves', async () => {
    vi.spyOn(searchEngine, 'fetchData').mockResolvedValue(mockItems);
    const user = userEvent.setup();

    render(
      <SearchProvider>
        <Search />
        <ItemsContainer />
      </SearchProvider>
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
      <SearchProvider>
        <Search />
        <ItemsContainer />
      </SearchProvider>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
  });
});
