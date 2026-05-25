/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useDetailsStore } from '../../../store';
import { useEffect } from 'react';

export const Route = createFileRoute('/_searchable/_split/$itemId')({
  component: RouteComponent,
});

function RouteComponent() {
  const fetchDetails = useDetailsStore((s) => s.fetchDetails);
  const details = useDetailsStore((s) => s.details);
  const isLoading = useDetailsStore((s) => s.isLoading);

  const { itemId } = Route.useParams();

  useEffect(() => {
    fetchDetails(itemId);
  }, [itemId, fetchDetails]);

  if (!details) {
    return <p>Oh no! There's no data on this movie...</p>;
  }

  return (
    <main aria-busy={isLoading}>
      {!isLoading && (
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
    </main>
  );
}
