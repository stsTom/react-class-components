import {
  type PropsWithChildren,
  createContext,
  useState,
  useCallback,
} from 'react';
import { fetchData, simulateError } from '../utils/searchEngine';

interface Item {
  id: string;
  title: string;
  details: string;
}

export interface SearchContextType {
  data: Item[];
  findItems: (searchRequest: string) => Promise<void>;
  simulateError: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const SearchContext = createContext<SearchContextType>({
  data: [],
  findItems: async () => {},
  simulateError: () => {},
  isLoading: true,
  errorMessage: null,
});

export function SearchProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const findItems = useCallback(async (searchRequest: string) => {
    setIsLoading(true);

    try {
      const items = await fetchData(searchRequest);
      setData(items ?? []);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }, []);

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
        data,
        findItems,
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
