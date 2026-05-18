import {
  type PropsWithChildren,
  createContext,
  useState,
  useCallback,
} from 'react';
import { fetchData, simulateError } from '../utils/searchEngine';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Item {
  id: string;
  title: string;
  details: string;
}

export interface SearchContextType {
  items: Item[];
  pagesCount: number;
  currentPage: number;
  findItems: (searchRequest: string, searchPage: number) => Promise<void>;
  goToPage: (page: number) => void;
  simulateError: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const SearchContext = createContext<SearchContextType>({
  items: [],
  pagesCount: 0,
  currentPage: 0,
  findItems: async () => {},
  goToPage: () => {},
  simulateError: () => {},
  isLoading: true,
  errorMessage: null,
});

export function SearchProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getLastRequest } = useLocalStorage();

  const findItems = useCallback(
    async (searchRequest: string, searchPage: number) => {
      setIsLoading(true);
      setCurrentPage(searchPage);

      try {
        const data = await fetchData(searchRequest, searchPage);
        setItems(data?.movies ?? []);
        setPagesCount(data?.pagesCount ?? 0);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    },
    []
  );

  const goToPage = (newPage: number) => {
    findItems(getLastRequest(), newPage);
  };

  const handleSimulateError = useCallback(() => {
    try {
      simulateError();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        items,
        pagesCount,
        currentPage,
        findItems,
        goToPage,
        simulateError: handleSimulateError,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
