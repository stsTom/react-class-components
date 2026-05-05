import { Search } from './components/Search/Search';
import { SearchProvider } from './context/SearchContext';
import { ItemsContainer } from './components/ItemsContainer/ItemsContainer';
import { ErrorBoundary } from './utils/ErrorBoundary';

function App() {
  return (
    <main>
      <ErrorBoundary>
        <SearchProvider>
          <header>
            <Search />
          </header>
          <section>
            <ItemsContainer />
          </section>
        </SearchProvider>
      </ErrorBoundary>
    </main>
  );
}

export default App;
