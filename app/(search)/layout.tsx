import { PropsWithChildren } from 'react';
import { NavMenu } from '../../src/components/NavMenu/NavMenu';
import { Search } from '../../src/components/Search/Search';

export default function SearchGroupLayout({ children }: PropsWithChildren) {
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
    </div>
  );
}
