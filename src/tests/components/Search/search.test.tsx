import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../../../components/Search/Search';
import { useSearchStore } from '../../../store';

vi.mock('../../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    getLastRequest: vi.fn().mockReturnValue(''),
    setLastRequest: vi.fn(),
  }),
}));

afterEach(() => {
  vi.restoreAllMocks();
  useSearchStore.setState({
    items: [],
    pagesCount: 0,
    currentPage: 0,
    isLoading: true,
    errorMessage: null,
  });
});

describe('Search functionality', () => {
  it('calls findItems from store when search request is submitted', async () => {
    const findItems = vi.fn();
    const user = userEvent.setup();

    useSearchStore.setState({ findItems });

    render(<Search />);

    await user.type(screen.getByPlaceholderText('Search'), 'Star Trek');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(findItems).toHaveBeenCalledWith('Star Trek', 0);
  });
});
