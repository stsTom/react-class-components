/* eslint-disable react-refresh/only-export-components */

import { ErrorBoundary } from '../utils/ErrorBoundary';
import { SearchProvider } from '../context/SearchContext';
import { Search } from '../components/Search/Search';
import { ItemsContainer } from '../components/ItemsContainer/ItemsContainer';
import { ErrorTrigger } from '../components/TestErrorButton/TestErrorButton';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: MainPage });

function MainPage() {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <header>
          <Search />
        </header>
        <ErrorBoundary>
          <section>
            <ItemsContainer />
          </section>
          <footer>
            <ErrorTrigger />
          </footer>
        </ErrorBoundary>
      </SearchProvider>
    </ErrorBoundary>
  );
}
