import { useNavigate } from '@tanstack/react-router';

interface CardProps {
  movieId: string;
  title: string;
  details: string;
}

export function ItemCard({ movieId, title, details }: CardProps) {
  const navigate = useNavigate();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ to: `/${movieId}` });
  };

  return (
    <article onClick={handleClick}>
      <strong id="card-title">{title}</strong>
      <small>{details}</small>
    </article>
  );
}
