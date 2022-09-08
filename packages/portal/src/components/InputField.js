import React from 'react';
// import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import { Controller } from 'react-hook-form';
//make one form in signup page, pass control of handleSubmit through props to the input fields
export default function InputField(props) {
  return (
    <Paper elevation={3} sx={{ width: '552px', marginTop: '5px' }}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => <TextField {...field} />}
      />
    </Paper>
  );
}
