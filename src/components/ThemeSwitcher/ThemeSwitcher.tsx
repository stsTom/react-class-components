import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* <span>
        <small>Light mode</small>
      </span> */}
      <input
        type="checkbox"
        role="switch"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        style={{ margin: '6px' }}
      />
      {/* <span>
        <small>Dark mode</small>
      </span> */}
    </>
  );
}
