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
    // button: {
    //   fontFamily: ['Poppins', 'serif'].join(','),
    //   fontSize: 18,
    //   marginTop: '25px',
    //   height: '56px',
    //   textTransform: 'capitalize',
    //   fontWeight: 'bold',
    // },
  },
});
