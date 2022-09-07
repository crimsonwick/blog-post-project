import React from 'react';
// import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';

export default function InputField(props) {
  return (
    <Paper
      component="form"
      sx={{ marginTop: '10px', width: '552px' }}
      noValidate
      autoComplete="off"
      elevation={10}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        style={{
          margin: 0,
          textAllign: 'centre',
          width: 'inherit',
          fontFamily: 'Montserrat',
        }}
        label={props.field}
      />
    </Paper>
  );
}
