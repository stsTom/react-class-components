import { type PropsWithChildren } from 'react';
import { Component, createContext } from 'react';
import { fetchData, simulateError } from '../utils/searchEngine';

interface item {
  id: string;
  title: string;
  details: string;
}

interface SearchContextType {
  data: item[];
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

export class SearchProvider extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.findItems = this.findItems.bind(this);
  }

  state: { data: item[]; isLoading: boolean; errorMessage: string | null } = {
    data: [],
    isLoading: true,
    errorMessage: null,
  };

  async findItems(searchRequest: string) {
    this.setState({ isLoading: true });

    try {
      const items = await fetchData(searchRequest);

      this.setState({ data: items, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ errorMessage: error.message });
      }
    }
  }

  simulateError = () => {
    try {
      simulateError();
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ errorMessage: error.message });
      }
    }
  };

  render() {
    return (
      <SearchContext.Provider
        value={{
          findItems: this.findItems,
          simulateError: this.simulateError,
          data: this.state.data,
          isLoading: this.state.isLoading,
          errorMessage: this.state.errorMessage,
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContext;
