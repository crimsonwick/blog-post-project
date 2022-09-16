import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormLabel, OutlinedInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';

const InputField = (props) => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            sx={{
              borderRadius: '20px',
              fontFamily: 'Poppins',
              width: customWidth || '100%',
              display: 'block',
            }}
            placeholder={props.placeholder}
            // onChange={onChange}
            onBlur={onBlur}
            selected={value}
            ref={ref}
            //
          />
        )}
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
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
