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

const Signup = () => {
  const [data, setData] = useState();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  const onSubmit = async(data) => {
    setData(data);
    console.log(data);
    const response = await getSignUpDetails(data);
    alert(JSON.stringify(response.data))
  }
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
          <p className='errorMsg'>{errors.email?.message}</p>
        </Box>
        <InputField
        variant="outlined"
        color="secondary"
          name="password"
          labelAbove="Create a password"
          control={control}
          placeholder="Enter your password"
          labelBelow="Use 8 or more characters with a mix of letters, numbers & symbols"
        />
        <p className='errorMsg'>{errors.password?.message}</p>
        <Box mt={3}>
          <InputButton name="Create An Account" />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
