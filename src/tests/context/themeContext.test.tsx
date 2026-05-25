import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { ThemeProvider } from '../../context/ThemeProvider';
import { ThemeContext } from '../../context/ThemeContext';

function TestConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </>
  );
}

it('toggles theme from light to dark when toggleTheme is called', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>
  );

  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByTestId('theme')).toHaveTextContent('dark');
});
