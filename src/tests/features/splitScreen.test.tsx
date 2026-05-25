import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../../routes/_searchable/_split';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  Outlet: () => <h1>Details panel</h1>,
  createFileRoute: () => (config: unknown) => config,
}));

vi.mock('../../pages/searchPage', () => ({
  SearchPage: () => <h1>Search page</h1>,
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('MainPage split layout', () => {
  it('renders both the search page and the outlet', async () => {
    render(<MainPage />);

    expect(
      await screen.findByRole('heading', { name: /search page/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /details panel/i })
    ).toBeInTheDocument();
  });

  it('navigates to root when the left panel (backdrop) is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<MainPage />);

    const backdrop = container.firstChild!.firstChild as HTMLElement;

    await user.click(backdrop);

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });
});
