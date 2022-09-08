import React from 'react';
import { Button } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function InputButton(props) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        bgcolor: 'gray',
        marginTop: '30px',
        fontFamily: 'Montserrat',
        borderRadius: '25px',
      }}
    >
      {props.name}
    </Button>
  );
}
