import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../../../components/Search/Search';
import SearchContext from '../../../context/SearchContext';
import { type SearchContextType } from '../../../context/SearchContext';

vi.mock('../../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getLastRequest: vi.fn().mockReturnValue(''),
    setLastRequest: vi.fn(),
  }),
}));

describe('Search functionality', () => {
  it('calls findItems from context when search request is submitted', async () => {
    const findItems = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchContext.Provider
        value={
          { findItems, simulateError: vi.fn() } as unknown as SearchContextType
        }
      >
        <Search />
      </SearchContext.Provider>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(findItems).toHaveBeenCalledWith('Star Trek', 0);
  });
});