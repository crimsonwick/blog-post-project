import styles from '../styles/ChangePassword/ChangePassword.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FormLabel, OutlinedInput, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { Container, Box } from '@mui/system';
import Header from '../components/Header';
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
      .oneOf([yup.ref('password1'), null], 'Passwords must match')
      .min(8)
      .max(20)
      .minUppercase(1, 'Password must include atleast one upper-case letter')
      .minSymbols(1, 'Password must include atleast one symbol'),
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
    errors.password1 ? setMessage(false) : setMessage(true);
    setMessage(true);
    const token = new URLSearchParams(location.search);
    const url = `http://localhost:5000/user/reset-password
    )}`;
    console.log(data, 'correct data');
    const options = {
      method: 'PUT',
      url: url,
      params: { token: `${token}` },
      data: { password1: data.password1, password2: data.password2 },
    };
    const response = await axios(options);
    const record = response.data;
    if (record.statusText === 'Success') {
      toast.success(record.message);
    } else {
      toast.error(record.message);
    }
    console.log(data);
  };
  const onClose = () => {
    setMessage(false);
  };
  return (
    <div className={styles.padding}>
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
      <Divider />
      <Box>
        <Header heading="Change Password" />
      </Box>
      <Container maxWidth="sm">
        <FormLabel sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
          Type new password
        </FormLabel>
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
                  marginBottom: '25px',
                  borderRadius: '25px',
                  fontSize: '18px',
                  height: '56px',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
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
              />
            )}
          />
          {errors.password1 && (
            <p className={styles.errorMsg}>{errors.password1.message}</p>
          )}

          <FormLabel sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
            Type new password again
          </FormLabel>
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
                  borderRadius: '25px',
                  fontSize: '18px',
                  height: '56px',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
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
              />
            )}
          />
          {errors.password2 && <p>{errors.password2.message}</p>}

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              borderRadius: '25px',
              fontSize: '18px',
              marginTop: '25px',
              height: '56px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            Save Changes
          </Button>
        </form>
      </Container>
    </div>
  );
}
export default ChangePassword;
