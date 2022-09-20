import { FormLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';

const InputField = (props) => {
  const customWidth = props.width;
  return (
    <Box>
      <FormLabel
        htmlFor="form-label-above"
        sx={{ fontFamily: 'Poppins', display: 'block' }}
      >
        {props.labelAbove}
      </FormLabel>

      <Controller
        name={props.name}
        control={props.control}
        // {...register(props.name)}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <OutlinedInput
            variant="outlined"
            sx={{
              borderRadius: '20px',
              width: customWidth || '100%',
            }}
            placeholder={props.placeholder}
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            ref={ref}
            color="secondary"
          />
        )}
      />
      <FormLabel
        htmlFor="form-label-below"
        sx={{ fontFamily: 'Poppins', fontSize: '14px' }}
      >
        {props.labelBelow}
      </FormLabel>
    </Box>
  );
};

export default InputField;
