import React, { Component } from 'react';

interface SearchProps {
  onSearch?: () => void;
}

interface SearchState {
  defaultRequest: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      defaultRequest: localStorage.getItem('lastRequest') || '',
    };
  }

  handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchRequest = formData.get('search');

    if (searchRequest) {
      localStorage.setItem('lastRequest', searchRequest.toString());
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
