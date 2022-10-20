import { createTheme, ThemeOptions } from '@mui/material/styles';

interface CustomThemeOptions extends ThemeOptions {
  palette: {
    [key: string]: any;
  },
  typography: {
    [key: string]: any;
  }
}

const options: CustomThemeOptions = {
  palette: {
    borderColor: 'text-primary',
    type: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
}

export const theme = createTheme(options);
