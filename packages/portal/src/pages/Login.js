import styles from '../styles/Login/Login.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Alert, AlertTitle } from '@mui/material';
import React, { useReducer } from 'react';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppContext } from '../App';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getLoginDetails, parseJwt } from '../services/LoginApi';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
  })
  .required();

const reducer = (state, action) => {
  switch (action.type) {
    case "FAILED":
      return { Submitted: !state.Submitted, showMessage: state.showMessage }
    case "SUCCESS":
      return { Submitted: !state.Submitted, showMessage: !state.showMessage }
    default:
      return { Submitted: state.Submitted, showMessage: state.showMessage }
  }
}


function Login() {
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

  const { parentTransfer, userToken, setRefreshToken, setLoggedIn } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, { Submitted: false, showMessage: false })
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const response = await getLoginDetails(data);
    console.log(" i am in submit handler,", response)
    if (response.data.accessToken) {
      dispatch({ type: "SUCCESS" })
      userToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      setLoggedIn(true);
      const parsetoken = parseJwt(response.data.accessToken)
      parentTransfer(parsetoken.user);
      localStorage.setItem('login', response.data.accessToken)
      setTimeout(() => {
        navigate('/');
      }, 100)
    } else {
      dispatch({ type: "FAILED" })
      setTimeout(() => {
        navigate('/signup');
      }, 1000)
    }
  };
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm">
      {((state.Submitted && state.showMessage) && (<Alert severity="success">
        <AlertTitle> <strong>Account <strong>LoggedIn</strong> Successfully</strong></AlertTitle>
        You can add up<strong> Your Posts</strong> Now!
      </Alert>))}
      {(state.Submitted && !state.showMessage) && <Alert severity="error">
        <AlertTitle> <strong>Account Not Created</strong></AlertTitle>
        You need to  <strong> Sign Up </strong>your Account!
      </Alert>}
      <h1 className={styles.headingOne}>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="my-input">Email address or username</FormLabel>{' '}
        <br />
        <br />
        <Controller
          control={control}
          name="email"
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
              sx={{
                borderRadius: 18,
                width: 550,
                marginBottom: 3,
              }}
              // fullWidth
              variant="outlined"
            />
          )}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <FormLabel htmlFor="my-input">Password</FormLabel>
        <br />
        <br />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={onChange} // send value to hook form
              sx={{
                borderRadius: 18,
                width: 550,
              }}
              //              fullWidth
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
        {errors.password && <p>{errors.password.message}</p>}
        <Link to="/reset-password" style={{ textDecoration: "none", color: "black" }}>
          <h5 className={styles.headingFive}>Forgot your password?</h5>
        </Link>
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label="Remember Me"
          sx={{ marginBottom: 2, }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ borderRadius: 25, fontSize: '22px' }}
        >
          Log in
        </Button>
      </form>
      <br />
      <br />
      <Divider />
      <h3 className={styles.h3}>Don't have an account?</h3>
      <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          // onClick = {login}
          sx={{ borderRadius: '25px', fontSize: '22px' }}
        >
          Sign up
        </Button>
      </Link>
      <br />
    </Container>
  );
}
export default Login;