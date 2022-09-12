import React from 'react';
import { OutlinedInput } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormLabel } from '@mui/material';

const InputField = (props) => {
  const { register } = useForm();
  return (
    <>
      <FormLabel htmlFor="form-label-above" sx={{ fontFamily: 'Montserrat' }}>
        {props.labelAbove}
      </FormLabel>
      <Controller
        name={props.name}
        control={props.control}
        {...register(props.name)}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            sx={{
              borderRadius: '20px',
              fontFamily: 'Montserrat',
            }}
            fullWidth
            placeholder={props.placeholder}
          />
        )}
      />
      <FormLabel htmlFor="form-label-below" sx={{ fontFamily: 'Montserrat' }}>
        {props.labelBelow}
      </FormLabel>
    </>
  );
};

export default InputField;
