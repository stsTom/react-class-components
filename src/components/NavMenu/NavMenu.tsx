import { Link } from '@tanstack/react-router';
import { ThemeToggle } from '../ThemeSwitcher/ThemeSwitcher';

export function NavMenu() {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </>
  );
}
