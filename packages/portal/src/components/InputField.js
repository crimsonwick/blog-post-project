import React from "react";
import { FormLabel, OutlinedInput } from '@mui/material';
// import  { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const InputField = (props) => {
  // const [values, setValues] = useState({
  //   password: '',
  //   showPassword: false,
  // });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     showPassword: !values.showPassword,
  //   });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const { register } = useForm();
  const customWidth = props.width;
  return (
    <>
      <FormLabel
        htmlFor="form-label-above"
        sx={{ fontFamily: "Poppins", display: "block" }}
      >
        {props.labelAbove}
      </FormLabel>

      <Controller
        name={props.name}
        control={props.control}
        //{...register(props.name)}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            // id="outlined-adornment-password"
            // type={values.showPassword ? 'text' : 'password'}
            // value={values.password}
            // onChange={handleChange('password')}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleClickShowPassword}
            //       onMouseDown={handleMouseDownPassword}
            //       edge="end"
            //     >
            //       {values.showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            //   </InputAdornment>
            // }
            sx={{
              borderRadius: "20px",
              fontFamily: "Poppins",
              width: customWidth || "100%",
              display: "block",
            }}
            placeholder={props.placeholder}
          />
        )}
      />
      <FormLabel
        htmlFor="form-label-below"
        sx={{ fontFamily: "Poppins", fontSize: "14px" }}
      >
        {props.labelBelow}
      </FormLabel>
    </>
  );
};

export default InputField;
