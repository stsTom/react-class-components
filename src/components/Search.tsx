import { Component } from 'react';

export class Search extends Component {
  render() {
    return (
      <form role="search">
        <input type="search" placeholder="Search" />
        <button type="submit">Search</button>
      </form>
    );
  }
}
