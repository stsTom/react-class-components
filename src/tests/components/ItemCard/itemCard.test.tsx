import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { useSelectionStore } from '../../../store/useSelectionStore';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

const defaultProps = {
  movieId: '1',
  title: 'Star Trek',
  details: 'Sci-fi series',
};

afterEach(() => {
  vi.clearAllMocks();
  useSelectionStore.setState({ selectedItems: [] });
});

describe('ItemCard — split screen navigation', () => {
  it('navigates to the movie route when the card is clicked', async () => {
    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} />);

    await user.click(screen.getByRole('article'));

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/1' });
  });

  it('does not navigate when the checkbox is clicked', async () => {
    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} />);

    await user.click(screen.getByRole('checkbox'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

describe('ItemCard — selection store', () => {
  it('adds the movie id to selectedItems when checkbox is clicked', async () => {
    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} />);

    await user.click(screen.getByRole('checkbox'));

    expect(useSelectionStore.getState().selectedItems).toContain('1');
  });

  it('removes the movie id from selectedItems when checkbox is clicked again', async () => {
    useSelectionStore.setState({ selectedItems: ['1'] });

    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} />);

    await user.click(screen.getByRole('checkbox'));

    expect(useSelectionStore.getState().selectedItems).not.toContain('1');
  });

  it('renders the checkbox as checked when movieId is in selectedItems', () => {
    useSelectionStore.setState({ selectedItems: ['1'] });

    render(<ItemCard {...defaultProps} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders the checkbox as unchecked when movieId is not in selectedItems', () => {
    render(<ItemCard {...defaultProps} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
