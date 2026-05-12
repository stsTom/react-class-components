import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../utils/ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders error message and hides children when an error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
        <p>Should not get rendered</p>
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Oops... Something went wrong.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Should not get rendered')
    ).not.toBeInTheDocument();
  });
});
