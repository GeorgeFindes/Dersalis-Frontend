import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Dashboard />
      </ThemeProvider>
    </>
  );
}
