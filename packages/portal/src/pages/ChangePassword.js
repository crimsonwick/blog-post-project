import styles from '../styles/ChangePassword/ChangePassword.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { OutlinedInput, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup
  .object({
    password1: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    password2: yup
      .string()
      .required()
      .oneOf([yup.ref('password1'), null], 'Passwords must match')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
  })
  .required();
function ChangePassword() {
  const [message, setMessage] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password1: '',
      password2: '',
    },
    resolver: yupResolver(schema),
  });
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const location = useLocation();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = async (data) => {
    // const token;
    errors.password1 ? setMessage(false) : setMessage(true);
    setMessage(true)
    const token = new URLSearchParams(location.search);
    const url = `http://localhost:5000/user/resetPassword/${token.get("token")}`
    console.log(data, "correct data")
    const options = {
      method: 'PUT',
      url: url,
      data: { password1: data.password1, password2: data.password2 }
    }
    const response = await axios(options)
    const record = response.data;
    if (record.statusText === 'Success') {
      toast.success(record.message)
    }
    else {
      toast.error(record.message)
    }
    console.log(data);
  };
  const onClose = () => {
    setMessage(false)
  };
  return (
    <div>
      <div className={styles.padding}>
        {/* <Box maxWidth='400px'>
          {message && <Alert severity="success">Password Changed</Alert>}
        </Box> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={message}
          autoHideDuration={2000}
          message="Password Changed"
          onclose={onClose}
        />
        <h1 className={styles.headingOne}>Account Settings</h1>
        <Divider />
        <h1 className={styles.headingOne2}>Change Password</h1>
        <label className={styles.grayLabel}>Type new password</label>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="password1"
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <OutlinedInput
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                checked={value}
                inputRef={ref}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                sx={{
                  borderRadius: 5,
                  marginBottom: 3,
                  width: 700,
                  marginTop: 1,
                }}
                fullWidth
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
            )}
          />
          {errors.password1 && <p>{errors.password1.message}</p>}
          <br />
          <br />
          <br />
          <label className={styles.grayLabel}>Type new password again</label>
          <br />
          <Controller
            control={control}
            name="password2"
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <OutlinedInput
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                checked={value}
                inputRef={ref}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                sx={{
                  borderRadius: 5,
                  marginBottom: 3,
                  width: 700,
                  marginTop: 1,
                }}
                fullWidth
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
            )}
          />
          {errors.password2 && <p>{errors.password2.message}</p>}
          <br />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ borderRadius: '25px', fontSize: '22px', width: '350px' }}
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;