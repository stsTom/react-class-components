import { useNavigate } from '@tanstack/react-router';
import { useSelectionStore } from '../../store/useSelectionStore';

interface CardProps {
  movieId: string;
  title: string;
  details: string;
}

export function ItemCard({ movieId, title, details }: CardProps) {
  const navigate = useNavigate();
  const manageSelection = useSelectionStore((s) => s.manageSelection);
  const isChecked = useSelectionStore((s) => s.selectedItems).includes(movieId)

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ to: `/${movieId}` });
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
