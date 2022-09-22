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
import { Alert, AlertTitle } from '@mui/material';

const Signup = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });
  const [message,setMessage] = useState(null)
  const onSubmit = async(data) => {
    const response = await getSignUpDetails(data);
    if(response.data){
        setMessage(true)
    }
    else{
      setMessage(false)
    }
  }
  return (
    <Container maxWidth="sm">
      {message ? (<Alert severity="success">
  <AlertTitle> <strong>Account Created Successfully</strong></AlertTitle>
  You need to <strong> Login </strong>your Account Now!
</Alert>): <Alert severity="error">
  <AlertTitle> <strong>Account Not Created</strong></AlertTitle>
  Try anyother email for  <strong> Sign Up </strong>your Account!
</Alert>}
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
          />
          <p>{errors.email?.message}</p>
        </Box>
        <InputField
          name="password"
          labelAbove="Create a password"
          control={control}
          placeholder="Enter your password"
          labelBelow="Use 8 or more characters with a mix of letters, numbers & symbols"
        />
        <p>{errors.password?.message}</p>
        <Box mt={3}>
          <InputButton name="Create An Account" />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
