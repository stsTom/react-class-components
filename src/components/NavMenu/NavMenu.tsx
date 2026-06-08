import { Link } from '@tanstack/react-router';
import { ThemeToggle } from '../ThemeSwitcher/ThemeSwitcher';
import { RefreshButton } from '../RefreshButton/RefreshButton';
import { ModalButton } from '../ModalButton/ModalButton';

export function NavMenu() {
  return (
    <>
      <li>
        <RefreshButton />
      </li>
      <li>
        <ModalButton />
      </li>
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
