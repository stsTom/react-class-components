/* eslint-disable react-refresh/only-export-components */

"use client";

import { useRouter } from 'next/navigation';
import { SearchPage } from '../../a-pages/searchPage';
import { PropsWithChildren } from 'react';

export function MainPage({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div className="grid">
      <div
        onClick={() => {
          router.push('/');
        }}
      >
        <SearchPage />
      </div>
      {children}
    </div>
  );
}
