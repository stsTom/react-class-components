import { Search } from './components/Search/Search';
import { SearchProvider } from './context/SearchContext';
import { ItemsContainer } from './components/ItemsContainer/ItemsContainer';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { ErrorTrigger } from './components/TestErrorButton/TestErrorButton';

function App() {
  return (
    <main>
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
    </main>
  );
}

export default App;
