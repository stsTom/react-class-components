"use client"

import { PropsWithChildren } from 'react';
import { NavMenu } from '../../src/components/NavMenu/NavMenu';
import { Search } from '../../src/components/Search/Search';
import { useSelectionStore } from '../../src/store/useSelectionStore';
import { SelectionFlyout } from '../../src/components/SelectionFlyout/SelectionFlyout'

export default function SearchGroupLayout({ children }: PropsWithChildren) {
  const isSelected = useSelectionStore((s) => s.selectedItems.length > 0)

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Search />
            </li>
          </ul>
          <ul>
            <NavMenu />
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        {isSelected && <SelectionFlyout />}
      </footer>
    </div>
  );
}
