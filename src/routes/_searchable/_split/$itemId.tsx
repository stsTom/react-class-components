/* eslint-disable react-refresh/only-export-components */

import { createFileRoute } from '@tanstack/react-router';
import DetailsContext from '../../../context/DetailsContext';
import { useContext, useEffect } from 'react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_searchable/_split/$itemId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { fetchDetails, details, isLoading } = useContext(DetailsContext);

  const { itemId } = Route.useParams();

  useEffect(() => {
    fetchDetails(itemId);
  }, [itemId]);

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
