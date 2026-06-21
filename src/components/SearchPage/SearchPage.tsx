"use client";

import { ItemsContainer } from '../ItemsContainer/ItemsContainer';
import { ErrorTrigger } from '../TestErrorButton/TestErrorButton';

export function SearchPage() {
  return (
    <div>
      <ItemsContainer />
      <footer>
        <ErrorTrigger />
      </footer>
    </div>
  );
}
