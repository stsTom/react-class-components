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
}

const SearchContext = createContext<SearchContextType>({
  data: [],
  findItems: async () => {},
});

export class SearchProvider extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.findItems = this.findItems.bind(this);
  }

  state: { data: item[] } = {
    data: [],
  };

  async findItems(searchRequest: string) {
    const items = await fetchData(searchRequest);
    this.setState((this.state.data = items));
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
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContext;
