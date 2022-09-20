import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
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
});
