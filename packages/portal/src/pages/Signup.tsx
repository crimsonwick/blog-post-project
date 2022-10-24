import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { OutlinedInput, ThemeProvider } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Container } from '@mui/system';
import { useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { Alerts } from '../components/Alerts';
import { Header } from '../components/Header';
import { InputButton } from '../components/InputButton';
import { getSignUpDetails } from '../services/LoginApi';
import '../styles/signup.css';
import { theme } from '../themes/theme';
YupPassword(yup);

enum MessageActionKind {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}
interface MessageAction {
  type: MessageActionKind;
}
interface StateInterface {
  Submitted: boolean;
  showMessage: boolean;
}
interface dataInterface {
  email: string;
  password: string;
}

const reducer = (state: StateInterface, action: MessageAction) => {
  switch (action.type) {
    case MessageActionKind.FAILED:
      return { Submitted: !state.Submitted, showMessage: state.showMessage };
    case MessageActionKind.SUCCESS:
      return { Submitted: !state.Submitted, showMessage: !state.showMessage };
    default:
      return state;
  }
};

export const Signup = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(20)
      .minUppercase(1, 'password must include atleast one upper-case letter')
      .minSymbols(1, 'password must include atleast one symbol')
      .required(),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  //*hide pw functionality
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [state, dispatch] = useReducer(reducer, {
    Submitted: false,
    showMessage: false,
  });
  const onSubmit = async (data: dataInterface) => {
    const responsed = await getSignUpDetails(data);
    if (responsed.data.id === undefined) {
      dispatch({ type: MessageActionKind.FAILED });
      Alerts.error('Account already exists');
    } else {
      dispatch({ type: MessageActionKind.SUCCESS });
      Alerts.success('Account Created successfully');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  return (
    <>
      <Container maxWidth='sm' sx={{ marginTop: '10em' }}>
        <Box mb={4}>
          <Header
            heading='Create An Account'
            desc='Already have an account? '
            link='/login'
          />
        </Box>
        <FormLabel
          htmlFor='form-label-above-email'
          sx={{ fontFamily: 'Poppins' }}
        >
          What's your email?
        </FormLabel>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          {errors.email ? (
            <Box mb={2}>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <OutlinedInput
                    error
                    autoComplete='username'
                    color={'secondary'}
                    {...field}
                    sx={{
                      borderRadius: '25px',
                      fontFamily: 'Poppins',
                      width: '100%',
                    }}
                    placeholder='Enter your email address'
                    endAdornment={
                      <InputAdornment position='end'></InputAdornment>
                    }
                  />
                )}
              />
              <span className='errorMsg'>{errors.email?.message}</span>
            </Box>
          ) : (
            <Box mb={2}>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <OutlinedInput
                    autoComplete='username'
                    color={'secondary'}
                    {...field}
                    sx={{
                      borderRadius: '25px',
                      fontFamily: 'Poppins',
                      width: '100%',
                    }}
                    placeholder='Enter your email address'
                    endAdornment={
                      <InputAdornment position='end'></InputAdornment>
                    }
                  />
                )}
              />
            </Box>
          )}

          <FormLabel htmlFor='form-label-above' sx={{ fontFamily: 'Poppins' }}>
            Create a Password
          </FormLabel>
          {errors.password ? (
            <Box>
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
              <FormLabel
                htmlFor='form-label-below'
                sx={{ fontFamily: 'Poppins', fontSize: '14px' }}
              >
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </FormLabel>
              <p className='errorMsg'>{errors.password?.message}</p>
            </Box>
          ) : (
            <Box>
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
              <FormLabel
                htmlFor='form-label-below'
                sx={{ fontFamily: 'Poppins', fontSize: '14px' }}
              >
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </FormLabel>
            </Box>
          )}
          <ThemeProvider theme={theme}>
            <Box mt={3}>
              <InputButton name='Create An Account' />
            </Box>
          </ThemeProvider>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
