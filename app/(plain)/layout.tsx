import { PropsWithChildren } from 'react';
import { NavMenu } from '../../src/components/NavMenu/NavMenu';

export default function PlainGroupLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header style={{ padding: '1rem' }}>
        <nav>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none' }}>
            <NavMenu />
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
