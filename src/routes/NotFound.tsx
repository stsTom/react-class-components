/* eslint-disable react-refresh/only-export-components */

import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/NotFound')({
  component: NotFound,
});

export function NotFound() {
  return (
    <main
      className="container"
      style={{ textAlign: 'center', padding: '4rem 0' }}
    >
      <article style={{ maxWidth: '600px', margin: '0 auto' }}>
        <header>
          <h2 style={{ color: 'var(--pico-primary)', margin: 0 }}>404</h2>
        </header>

        <h3>Page Not Found</h3>
        <p>
          Oops! The page you are looking for doesn't exist, has been moved, or
          is temporarily unavailable.
        </p>

        <footer>
          <Link to="/" role="button" className="primary">
            Back to Homepage
          </Link>
        </footer>
      </article>
    </main>
  );
}
