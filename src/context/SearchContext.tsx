import { type PropsWithChildren } from 'react';
import { Component, createContext } from 'react';
import { fetchData } from '../utils/searchEngine';

interface item {
  id: string;
  title: string;
  details: string;
}

interface SearchContextType {
  data: item[];
  findItems: (searchRequest: string) => Promise<void>;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType>({
  data: [],
  findItems: async () => {},
  isLoading: true,
});

export class SearchProvider extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.findItems = this.findItems.bind(this);
  }

  state: { data: item[]; isLoading: boolean } = {
    data: [],
    isLoading: true,
  };

  async findItems(searchRequest: string) {
    this.setState({ isLoading: true });
    const items = await fetchData(searchRequest);
    this.setState({ data: items, isLoading: false });
  }

  getItems = () => {
    const itemInfo = this.state.data;
    return itemInfo;
  };

  render() {
    return (
      <SearchContext.Provider
        value={{
          data: this.getItems(),
          findItems: this.findItems,
          isLoading: this.state.isLoading,
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContext;
