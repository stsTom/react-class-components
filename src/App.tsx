import { Search } from './components/Search/Search';
import { SearchProvider } from './context/SearchContext';
import { ItemsContainer } from './components/ItemsContainer/ItemsContainer';

function App() {
  return (
    <main>
      <SearchProvider>
        <header>
          <Search />
        </header>
        <section>
          <ItemsContainer />
        </section>
      </SearchProvider>
    </main>
  );
}

export default App;
