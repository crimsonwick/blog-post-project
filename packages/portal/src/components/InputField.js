import React from 'react';
import { OutlinedInput } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormLabel } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const InputField = (props) => {
  // const schema = yup.object().shape({
  //   email: yup.string().email().required(),
  //   password: yup.string().min(8).max(20).required(),
  // });
  // // const input
  const { register } = useForm();
  //   resolver: yupResolver(schema),
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
      {/* {errors.email && <p>{errors.email.message}</p>} */}
    </>
  );
};

export default InputField;
