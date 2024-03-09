import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../theme';
import { usePersistState } from '../hooks/usePersistState';

/**
 * Context for theme mode
 */
type ThemeModeContextType = 'dark' | 'light' | 'auto' | undefined;

const ThemeContext = React.createContext<
  | null
  | [
      ThemeModeContextType,
      React.Dispatch<React.SetStateAction<ThemeModeContextType>>,
    ]
>(null);

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeMode, setThemeMode] = usePersistState<ThemeModeContextType>(
    'themeMode',
    'light',
  );
  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={[themeMode, setThemeMode]}>
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, react-refresh/only-export-components
export const useThemeContext = () => React.useContext(ThemeContext)!;
