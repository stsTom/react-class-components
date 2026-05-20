import { Link } from '@tanstack/react-router';

export function NavMenu() {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );
}
