import {
  type PropsWithChildren,
  createContext,
  useState,
  useCallback,
} from 'react';
import { fetchItemData } from '../utils/searchEngine';

interface Details {
  title: string;
  mainDirector: string;
  usReleaseDate: string;
}

export interface DetailsContextType {
  details: Details | null;
  fetchDetails: (movieId: string) => Promise<void>;
  isLoading: boolean;
  errorMessage: string | null;
}

const DetailsContext = createContext<DetailsContextType>({
  details: null,
  fetchDetails: async () => {},
  isLoading: true,
  errorMessage: null,
});

export function DetailsProvider({ children }: PropsWithChildren) {
  const [details, setDetails] = useState<Details | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchDetails = useCallback(async (movieId: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const movieData = await fetchItemData(movieId);
      setDetails({
        title: movieData.movie.title,
        mainDirector: movieData.movie.mainDirector.name,
        usReleaseDate: movieData.movie.usReleaseDate,
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <DetailsContext.Provider
      value={{
        details,
        fetchDetails,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
}

export default DetailsContext;
