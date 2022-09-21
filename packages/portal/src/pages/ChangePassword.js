import styles from '../styles/ChangePassword/ChangePassword.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Navbar from '../components/Navbar';
import { OutlinedInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);


const schema = yup
  .object({
    password1: yup
      .string()
      .required()
      .min(8)
      .max(20)
      .minUppercase(1, 'Password must include atleast one upper-case letter')
      .minSymbols(1, 'Password must include atleast one symbol'),

    password2: yup
      .string()
      .required()
      .oneOf([yup.ref('password1'), null], 'Passwords must match')      .min(8)
      .max(20)
      .minUppercase(1, 'Password must include atleast one upper-case letter')
      .minSymbols(1, 'Password must include atleast one symbol'),
  })
  .required();

function ChangePassword() {
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

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Navbar/>
      <div className={styles.padding}>
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
                variant="outlined"
              color="secondary"
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
          {errors.password1 && <p className={styles.errorMsg}>{errors.password1.message}</p>}
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
                variant="outlined"
              color="secondary"
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
          {errors.password2 && <p className={styles.errorMsg}>{errors.password2.message}</p>}

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
