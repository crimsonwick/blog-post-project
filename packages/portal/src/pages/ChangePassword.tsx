import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormLabel, InputAdornment, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import customAxios from '../auth/useAxios';
import { Alerts } from '../components/Alerts';
import { Header } from '../components/Header';
import '../styles/signup.css';
YupPassword(yup);
const schema = yup
  .object({
    password: yup
      .string()
      .required()
      .min(8)
      .max(20)
      .minUppercase(1, 'password must include atleast one upper-case letter')
      .minSymbols(1, 'password must include atleast one symbol'),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'passwords must match')
      .min(8)
      .max(20)
      .minUppercase(1, 'password must include atleast one upper-case letter')
      .minSymbols(1, 'password must include atleast one symbol'),
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
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [values2, setValues2] = useState({
    confirmPassword: '',
    showPassword: false,
  });
  const location = useLocation();

  /**
   * Handle Click Show Password
   */
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  /**
   * Handle Mouse down password
   * @param event
   */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /**
   * Handle Click Show Password2
   */
  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword: !values2.showPassword,
    });
  };

  /**
   * On Submit Function
   * @param data
   */
  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      // console.log('??????????????????????????????????')
      errors.password ? setMessage(false) : setMessage(true);
      setMessage(true);
      const unparsedToken = location.search;
      const token = unparsedToken.slice(7, unparsedToken.length);
      const url = `http://localhost:5000/users/reset-password`;
      console.log(data, 'correct data');
      const newData = {
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      const response = await customAxios.put(`${url}?token=${token}`, newData);
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
    <Container maxWidth='sm' sx={{ marginTop: '10em' }}>
      <Header heading='Change Password' />
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.password ? (
          <Box mt={2}>
            <FormLabel sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Type new password
            </FormLabel>
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <OutlinedInput
                  error
                  autoComplete='new-password'
                  color={'secondary'}
                  type={values.showPassword ? 'text' : 'password'}
                  {...field}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                  }}
                  placeholder='Enter your password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
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
            <p className='errorMsg'>{errors.password.message}</p>
          </Box>
        ) : (
          <Box mt={2}>
            <FormLabel sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Type new password
            </FormLabel>
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <OutlinedInput
                  autoComplete='new-password'
                  color={'secondary'}
                  type={values.showPassword ? 'text' : 'password'}
                  {...field}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                  }}
                  placeholder='Enter your password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
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
          </Box>
        )}

        <Box mt={2}>
          <FormLabel sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
            Type new password again
          </FormLabel>
        </Box>
        {errors.confirmPassword ? (
          <Box>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field }) => (
                <OutlinedInput
                  error
                  autoComplete='new-password'
                  color={'secondary'}
                  type={values2.showPassword ? 'text' : 'password'}
                  {...field}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                  }}
                  placeholder='Confirm Your Password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
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
            <p className='errorMsg'>{errors.confirmPassword.message}</p>
          </Box>
        ) : (
          <Box>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field }) => (
                <OutlinedInput
                  autoComplete='new-password'
                  color={'secondary'}
                  type={values2.showPassword ? 'text' : 'password'}
                  {...field}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                  }}
                  placeholder='Confirm Your Password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
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
          </Box>
        )}
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          sx={{
            borderRadius: '25px',
            fontSize: '18px',
            marginTop: '20px',
            height: '56px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};
export default ChangePassword;
