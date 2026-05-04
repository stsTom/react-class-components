import React, { Component, type ContextType } from 'react';
import SearchContext from '../../context/SearchContext';

export class Search extends Component {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search');

    if (searchRequest) {
      localStorage.setItem('lastRequest', searchRequest.toString());
      await this.context.findItems(searchRequest.toString());
    }
  };

  render() {
    return (
      <form role="search" onSubmit={this.handleSubmit}>
        <input
          type="search"
          name="search"
          defaultValue={localStorage.getItem('lastRequest')!}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
