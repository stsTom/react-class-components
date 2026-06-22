"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const SIBLINGS = 1;

function getPageRange(current: number, total: number): (number | '...')[] {
  const left = current - SIBLINGS;
  const right = current + SIBLINGS;
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  const pages: (number | '...')[] = [1];

  if (showLeftDots) pages.push('...');
  for (let i = Math.max(left, 2); i <= Math.min(right, total - 1); i++) pages.push(i);
  if (showRightDots) pages.push('...');

  if (total > 1) pages.push(total);

  return pages;
}

interface PaginationProps {
  pagesCount: number;
}

export function Pagination({ pagesCount }: PaginationProps) {
  const { page } = useParams();
  const currentPage = Number(page);

  const pages = getPageRange(currentPage, pagesCount);

  return (
    <div role="group" aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}>
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} aria-hidden>…</span>
        ) : (
          <Link
            key={page}
            href={`/search/${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-disabled={page === currentPage}
            onClick={(e) => {
              if (page === currentPage) e.preventDefault();
            }}
          >
            {page}
          </Link>
        )
      )}
    </div>
  );
}