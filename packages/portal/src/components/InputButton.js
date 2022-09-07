import React from 'react';
import { Button } from '@mui/material';

export default function InputButton() {
  return (
    <Button
      variant="contained"
      sx={{
        width: '552px',
        bgcolor: 'gray',
        marginTop: '30px',
        fontFamily: 'Montserrat',
      }}
    >
      Create An Account
    </Button>
  );
}
