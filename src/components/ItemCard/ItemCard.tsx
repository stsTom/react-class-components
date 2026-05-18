interface CardProps {
  title: string;
  details: string;
}

export function ItemCard({ title, details }: CardProps) {
  return (
    <article>
      <strong id="card-title">{title}</strong>
      <small>{details}</small>
    </article>
  );
}
