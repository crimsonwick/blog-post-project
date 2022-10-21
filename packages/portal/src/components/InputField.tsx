import { Box, FormLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputFieldInterface {
  width: string;
  labelAbove: string;
  placeholder: string;
  name: string;
  control: Control<any, any>;
  labelBelow?: string;
}

export const InputField = (props: InputFieldInterface) => {
  const customWidth = props.width;
  return (
    <Box>
      <FormLabel
        htmlFor='form-label-above'
        sx={{ fontFamily: 'Poppins', display: 'block' }}
      >
        {props.labelAbove}
      </FormLabel>

      <Controller
        name={props.name}
        control={props.control}
        defaultValue=''
        render={({ field }) => {
          return (
            <OutlinedInput
              {...field}
              autoComplete='username'
              sx={{
                borderRadius: '25px',
                width: customWidth || '100%',
              }}
              placeholder={props.placeholder}
              color='secondary'
            />
          );
        }}
      />
      <FormLabel
        htmlFor='form-label-below'
        sx={{ fontFamily: 'Poppins', fontSize: '14px' }}
      >
        {props.labelBelow}
      </FormLabel>
    </Box>
  );
};
