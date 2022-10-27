import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from '@mui/system';
import { default as React, useContext, useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { AppContext } from '../context/AppContext';
import { Alerts } from '../components/Alerts';
import { AppContextInterface, UserInterface } from '../interface/App';
import { getLoginDetails, parseJwt, refreshToken } from '../services/LoginApi';
import styles from '../styles/Login/Login.module.css';
import '../styles/signup.css';
import { Header } from '../components/Header';

YupPassword(yup);

interface dataInterface {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(20)
      .minUppercase(1, 'password must include atleast one upper-case letter')
      .minSymbols(1, 'password must include atleast one symbol'),
  })
  .required();
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

export const Login = () => {
  const [checkBox, setCheckBox] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, {
    Submitted: false,
    showMessage: false,
  });
  const navigate = useNavigate();

  /**
   * On Submit Function
   * @param data 
   */
  const onSubmit = async (data: dataInterface) => {
    try {
      const response = await getLoginDetails(data);
      console.log(' i am in submit handler,', response);
      if (response.data.accessToken) {
        dispatch({ type: MessageActionKind.SUCCESS });
        Alerts.success('Logged In Successfully');
        context?.setLoginToken(
          response.data.accessToken,
          response.data.refreshToken
        );
        context?.setAccessToken(localStorage.getItem('accessToken'));
        context?.setRefreshToken(localStorage.getItem('refreshToken'));
        context?.setLoggedIn(true);
        const parsetoken = parseJwt(
          localStorage.getItem('accessToken') as unknown as string
        );
        context?.setUserData(parsetoken.user);
        localStorage.setItem('login', response.data.accessToken);
        localStorage.setItem('userDetails', JSON.stringify(parsetoken.user));
        if (checkBox) {
          const responseRefreshToken = response.data.refreshToken;
          if (responseRefreshToken) {
            const body = {
              token: responseRefreshToken,
            };
            await refreshToken(body);
            console.log('remembered me');
          }
        }

        if (state) {
          setTimeout(() => {
            navigate('/');
          }, 100);
        }
      } else {
        dispatch({ type: MessageActionKind.FAILED });
        Alerts.error('Wrong Credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [values, setValues] = React.useState({
    showPassword: false,
    password: '',
  });
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
   * Handle Mouse Down Password
   * @param event 
   */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Container maxWidth='sm' sx={{ marginTop: '10em' }}>
      <Box mb={4}>
        <Header heading='Log In' />
      </Box>
      <FormLabel htmlFor='my-input'>Email address</FormLabel>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email ? (
          <Box>
            <Controller
              control={control}
              name='email'
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <OutlinedInput
                  error
                  placeholder='Enter your Email'
                  autoComplete='username'
                  color='secondary'
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  inputRef={ref}
                  sx={{
                    borderRadius: 18,
                    width: 550,
                    marginBottom: 0,
                  }}
                />
              )}
            />
            <span className='errorMsg'>{errors.email.message}</span>
          </Box>
        ) : (
          <Box>
            <Controller
              control={control}
              name='email'
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <OutlinedInput
                  placeholder='Enter your Email'
                  autoComplete='username'
                  color='secondary'
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  inputRef={ref}
                  sx={{
                    borderRadius: 18,
                    width: 550,
                  }}
                />
              )}
            />
          </Box>
        )}

        {errors.password ? (
          <Box mt={2}>
            <FormLabel htmlFor='my-input'>Password</FormLabel>
            <Controller
              control={control}
              name='password'
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <OutlinedInput
                  error
                  autoComplete='new-password'
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  color={'secondary'}
                  type={values.showPassword ? 'text' : 'password'}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                    marginBottom: '0px',
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
            <span className='errorMsg'>{errors.password.message}</span>
          </Box>
        ) : (
          <Box mt={2}>
            <FormLabel htmlFor='my-input'>Password</FormLabel>
            <Controller
              control={control}
              name='password'
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <OutlinedInput
                  autoComplete='new-password'
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                  color={'secondary'}
                  type={values.showPassword ? 'text' : 'password'}
                  sx={{
                    borderRadius: '25px',
                    fontFamily: 'Poppins',
                    width: '100%',
                    marginBottom: '0px',
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

        <Link to='/reset-password' style={{ color: 'black' }}>
          <h5 className={styles.headingFive}>Forgot your password?</h5>
        </Link>
        <FormControlLabel
          control={<Checkbox color='secondary' />}
          label='Remember Me'
          sx={{ marginBottom: 2 }}
          onChange={() => {
            setCheckBox(!checkBox);
          }}
        />
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          sx={{
            borderRadius: '25px',
            fontSize: '18px',
            height: '56px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        >
          Log in
        </Button>
      </form>
      <Box mt={4}>
        <Divider />
      </Box>

      <h3 className={styles.h3}>Don't have an account?</h3>

      <Box mb={2}>
        <Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>
          <Button
            fullWidth
            variant='outlined'
            color='secondary'
            sx={{
              borderRadius: '25px',
              fontSize: '18px',
              height: '56px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            Sign up
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
