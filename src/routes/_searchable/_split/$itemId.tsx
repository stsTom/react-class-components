/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useDetailsStore, useMovieDetails } from '../../../store';

export const Route = createFileRoute('/_searchable/_split/$itemId')({
  component: RouteComponent,
});

function RouteComponent() {
  const details = useDetailsStore((s) => s.details);
  const errorMessage = useDetailsStore((s) => s.errorMessage);

  const { itemId } = Route.useParams();

  const { isFetching } = useMovieDetails({ movieId: itemId });

  if (!isFetching && !details && !errorMessage) {
    return <p>Oh no! There's no data on this movie...</p>;
  }

  return (
    <main aria-busy={isFetching}>
      {!isFetching && details && !errorMessage && (
        <article>
          <h2>Movie Details</h2>
          <p>
            <strong>{details.title}</strong>{' '}
            <small>was brought to life under the direction of</small>{' '}
            <strong>{details.mainDirector}</strong>,
            <small> making its US debut on</small>{' '}
            <strong>{details.usReleaseDate}</strong>.
          </p>
          <footer>
            <Link to="/">Close window</Link>
          </footer>
        </article>
      )}

      {!isFetching && errorMessage && (
        <div role="alert">
          <h3>{errorMessage}</h3>
        </div>
      )}
    </main>
  );
}
