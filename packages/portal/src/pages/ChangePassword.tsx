import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { Alerts } from '../components/Alerts';
import { Header } from '../components/Header';
import styles from '../styles/ChangePassword/ChangePassword.module.css';
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
export const ChangePassword = () => {
  const navigate = useNavigate();
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
  const [values, setValues] = useState({
    password1: '',
    showPassword: false,
  });
  const [values2, setValues2] = useState({
    password2: '',
    showPassword: false,
  });
  const location = useLocation();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword: !values2.showPassword,
    });
  };
  const onSubmit = async (data: { password1: string; password2: string }) => {
    try {
      errors.password1 ? setMessage(false) : setMessage(true);
      setMessage(true);
      const unparsedToken = location.search;
      const token = unparsedToken.slice(7, unparsedToken.length);
      const url = `http://localhost:5000/users/reset-password`;
      console.log(data, 'correct data');
      const options = {
        method: 'PUT',
        url: url,
        params: { token: `${token}` },
        data: { password1: data.password1, password2: data.password2 },
      };
      const response = await axios(options);
      if (response.data) {
        console.log(message);
        Alerts.success('Password Updated');
        navigate('/login');
      }
    } catch (err) {
      Alerts.error('Something Bad Occurs');
    }
  };
  return (
    <div className={styles.padding}>
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
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="new-password"
                variant="outlined"
                color="secondary"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password1}
                sx={{
                  borderRadius: '25px',
                  fontFamily: 'Poppins',
                  width: '100%',
                }}
                placeholder="Enter your password"
                //@ts-ignore
                endAdornment={
                  <InputAdornment position="end">
                    <TextField
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      //@ts-ignore
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </TextField>
                  </InputAdornment>
                }
              />
            )}
          />
          {errors.password1 && (
            <p className={styles.errorMsg}>{errors.password1.message}</p>
          )}
          <Box mt={1}>
            <FormLabel sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Type new password again
            </FormLabel>
            <Controller
              control={control}
              name="password2"
              render={({ field: undefined }) => (
                <TextField
                  autoComplete="new-password"
                  variant="outlined"
                  color="secondary"
                  type={values2.showPassword ? 'text' : 'password'}
                  value={values2.password2}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                  }}
                  placeholder="Enter your password"
                  //@ts-ignore
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values2.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password2 && (
              <p className={styles.errorMsg}>{errors.password2.message}</p>
            )}
          </Box>
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
};
export default ChangePassword;