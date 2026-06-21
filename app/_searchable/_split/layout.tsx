"use client";

import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { SearchPage } from '../../../src/components/SearchPage/SearchPage';

export default function SplitLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div className="grid" style={{ minHeight: '100vh' }}>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          router.push('/');
        }}
      >
        <SearchPage />
      </div>
      <div>{children}</div>
    </div>
  );
}
