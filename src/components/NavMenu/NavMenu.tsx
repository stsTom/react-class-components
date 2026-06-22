"use client";

import Link from 'next/link';
import { ThemeToggle } from '../ThemeSwitcher/ThemeSwitcher';
import { RefreshButton } from '../RefreshButton/RefreshButton';

export function NavMenu() {
  return (
    <>
      <li>
        <RefreshButton />
      </li>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </>
  );
}
