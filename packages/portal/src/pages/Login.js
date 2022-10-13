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
import { default as React, default as React, useContext, useReducer } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { AppContext } from '../App';
import { Alerts } from '../components/Alerts';
import { getLoginDetails, parseJwt } from '../services/LoginApi';
import styles from '../styles/Login/Login.module.css';
import '../styles/signup.css';
YupPassword(yup);

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(20)
      .minUppercase(1, 'Password must include atleast one upper-case letter')
      .minSymbols(1, 'Password must include atleast one symbol'),
  })
  .required();

const reducer = (state, action) => {
  switch (action.type) {
    case 'FAILED':
      return { Submitted: !state.Submitted, showMessage: state.showMessage };
    case 'SUCCESS':
      return { Submitted: !state.Submitted, showMessage: !state.showMessage };
    default:
      return state
  }
};

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

  const { setUser, setAccessToken, setRefreshToken, setLoggedIn } =
    useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, {
    Submitted: false,
    showMessage: false,
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await getLoginDetails(data);
      console.log(' i am in submit handler,', response);
      if (response.data.accessToken) {
        dispatch({ type: 'SUCCESS' });
        Alerts.success('Logged In Successfully');
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setLoggedIn(true);
        const parsetoken = parseJwt(response.data.accessToken);
        setUser(parsetoken.user);
        localStorage.setItem("login", response.data.accessToken);
        if(state){
          setTimeout(() => {
            navigate("/");
          }, 100);
        }
      } else {
        dispatch({ type: 'FAILED' });
        Alerts.error('Wrong Credentials');
      }
    } catch (err) {
      console.log(err);
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
      <h1 className={styles.headingOne}>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="my-input">Email address</FormLabel>{' '}
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
              autoComplete="username"
              variant="outlined"
              color="secondary"
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              checked={value}
              inputRef={ref}
              sx={{
                borderRadius: 18,
                width: 550,
                marginBottom: 2,
              }}
            />
          )}
        />
        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        <Box mt={2} />
        <FormLabel htmlFor="my-input">Password</FormLabel>
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
              variant="outlined"
              autoComplete="current-password"
              color="secondary"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={onChange} // send value to hook form
              sx={{
                borderRadius: 18,
                width: 550,
                marginBottom: 2,
              }}
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
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}
        <Link to="/reset-password" style={{ color: 'black' }}>
          <h5 className={styles.headingFive}>Forgot your password?</h5>
        </Link>
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label="Remember Me"
          sx={{ marginBottom: 2 }}
        />
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
          Log in
        </Button>
      </form>
      <Box mt={4}>
        <Divider />
      </Box>

      <h3 className={styles.h3}>Don't have an account?</h3>

      <Box mb={2}>
        <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '25px',
              fontSize: '18px',
              marginTop: '25px',
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
}

export default Login;
