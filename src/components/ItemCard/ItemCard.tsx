"use client";

import { useRouter } from 'next/navigation';
import { useSelectionStore } from '../../store/useSelectionStore';
import { useSearchStore } from '../../store/useSearchStore';

interface CardProps {
  movieId: string;
  title: string;
  details: string;
}

export function ItemCard({ movieId, title, details }: CardProps) {
  const router = useRouter();
  const manageSelection = useSelectionStore((s) => s.manageSelection);
  const isChecked = useSelectionStore((s) => s.selectedItems).includes(movieId);
  const currentPage = useSearchStore((s) => s.currentPage);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const pageNumber = Math.max(1, currentPage + 1);
    router.push(`/${pageNumber}/${movieId}`);
  };

  return (
    <article onClick={handleClick}>
      <nav>
        <ul>
          <li>
            <input
              type="checkbox"
              checked={isChecked}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                e.stopPropagation();
                manageSelection(movieId);
              }}
            />
          </li>
          <li>
            <strong id="card-title">{title}</strong>
            <small>{details}</small>
          </li>
        </ul>
      </nav>
    </article>
  );
}
