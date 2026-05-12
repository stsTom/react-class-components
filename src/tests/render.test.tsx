import { render, screen } from '@testing-library/react';
import App from '../App';

it('should render the search form', () => {
  render(<App />);
  const searchForm = screen.getByRole('search');
  expect(searchForm).toBeInTheDocument();
});
