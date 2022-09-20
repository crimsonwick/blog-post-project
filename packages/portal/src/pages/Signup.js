import { Container } from '@mui/system';
import Header from '../components/Header';
import InputField from '../components/InputField';
import InputButton from '../components/InputButton';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSignUpDetails } from '../services/LoginApi';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import "../styles/signup.css"
import YupPassword from 'yup-password';
import '../styles/signup.css';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Controller } from 'react-hook-form';
import { OutlinedInput } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
YupPassword(yup);

const Signup = () => {
  const [data, setData] = useState();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(20)
      .minUppercase(1, 'Password must include atleast one upper-case letter')
      .minSymbols(1, 'Password must include atleast one symbol')
      .required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  // const onSubmit = async(data) => {
  //   setData(data);
  //   console.log(data);
  //   const response = await getSignUpDetails(data);
  //   alert(JSON.stringify(response.data))
  // }
  const onSubmit = async (data) => {
    console.log(data);
    console.log(await axios.post('http://localhost:5000/user/signup', data));
  };

  //*hide pw functionality
  const [values, setValues] = useState({
    password: '',
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
      {data && (
        <div>
          {data.message !== undefined && (
            <Alert severity="error">{data?.message}</Alert>
          )}

          {data === "undefined Account Already Exists" && (
            <Alert severity="error">Already Exists</Alert>
          )}
        </div>
      )}

      <Box>
        <Header
          heading="Create An Account"
          desc="Already have an account? "
          link="/login"
        />
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <InputField
            name="email"
            labelAbove="What's your email?"
            control={control}
            placeholder="Enter your email address"
            variant="outlined"
              color="secondary"
          />
          <p className="errorMsg">{errors.email?.message}</p>
        </Box>
        <FormLabel htmlFor="form-label-above" sx={{ fontFamily: 'Poppins' }}>
          Create a Password
        </FormLabel>

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <OutlinedInput
              variant="outlined"
              color="secondary"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              {...field}
              sx={{
                borderRadius: '20px',
                fontFamily: 'Poppins',
                width: '100%',
              }}
              placeholder="Enter your password"
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
        <FormLabel
          htmlFor="form-label-below"
          sx={{ fontFamily: 'Poppins', fontSize: '14px' }}
        >
          Use 8 or more characters with a mix of letters, numbers & symbols
        </FormLabel>
        <p className="errorMsg">{errors.password?.message}</p>
        <Box mt={3}>
          <InputButton name="Create An Account" />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
