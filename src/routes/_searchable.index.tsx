/* eslint-disable react-refresh/only-export-components */

import { ErrorBoundary } from '../utils/ErrorBoundary';
import { ItemsContainer } from '../components/ItemsContainer/ItemsContainer';
import { ErrorTrigger } from '../components/TestErrorButton/TestErrorButton';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_searchable/')({ component: MainPage });

function MainPage() {
  return (
    <ErrorBoundary>
      <section>
        <ItemsContainer />
      </section>
      <footer>
        <ErrorTrigger />
      </footer>
    </ErrorBoundary>
  );
}
