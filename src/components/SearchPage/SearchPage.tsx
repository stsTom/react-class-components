"use client";

import { ItemsContainer } from '../ItemsContainer/ItemsContainer';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';
import { Search } from '../Search/Search';

export function SearchPage() {
  return (
    <div>
      <header>
        <Search />
      </header>
      <ItemsContainer />
      <footer>
        <ErrorTrigger />
      </footer>
    </div>
  );
}
