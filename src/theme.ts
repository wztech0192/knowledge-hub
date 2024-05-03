import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

/**
 * Handles global theme
 * @see https://mui.com/material-ui/customization/theming/
 */

const sharedTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
};

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#0E46A3',
    },
  },
  ...sharedTheme,
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FEFAF6',
    },
  },
  ...sharedTheme,
});

export const globalStyle = (theme: Theme) => ({
  'html, body': {
    margin: 0,
    height: '0%',
    backgroundColor: theme.palette.background.default,
  },
});
