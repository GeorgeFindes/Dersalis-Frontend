import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { Dashboard } from './pages/Dashboard';
import { ResultsDataProvider } from './contexts/ResultContext';

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ResultsDataProvider>
          <Dashboard />
        </ResultsDataProvider>
      </ThemeProvider>
    </>
  );
}
