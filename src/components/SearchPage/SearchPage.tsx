"use client";

import { ItemsContainer } from '../ItemsContainer/ItemsContainer';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';

export function SearchPage({ pageNumber }: { pageNumber: number }) {
  return (
    <div>
      <ItemsContainer pageNumber={ pageNumber }/>
      <footer>
        <ErrorTrigger />
      </footer>
    </div>
  );
}
