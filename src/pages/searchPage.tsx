import { ItemsContainer } from '../components/ItemsContainer/ItemsContainer';
import { ErrorTrigger } from '../components/TestErrorButton/TestErrorButton';

export function SearchPage() {
  return (
    <div id="searchPage">
      <ItemsContainer />
      <footer>
        <ErrorTrigger />
      </footer>
    </div>
  );
}
