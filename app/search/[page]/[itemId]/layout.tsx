"use client";

import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

interface ItemLayoutProps {
  params: Promise<{
    page: string;
  }>;
}

export default function ItemLayout({ children, params }: PropsWithChildren<ItemLayoutProps>) {
  const { page } = React.use(params);
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/search/${page}`)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          cursor: 'default',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </>
  );
}