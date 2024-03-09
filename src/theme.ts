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
    primary: {
      main: '#3f50b5',
    },
  },
  ...sharedTheme,
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#657de8',
    },
  },
  ...sharedTheme,
});

export const globalStyle = (theme: Theme) => ({
  'html, body': {
    margin: 0,
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});
