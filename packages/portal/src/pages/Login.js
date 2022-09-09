import React from 'react';
import { Container } from '@mui/system';

import Header from '../components/Header';
import { Box } from '@mui/material';
import InputField from '../components/InputField';
import InputButton from '../components/InputButton';

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={20} mb={5}>
        <Header heading="Login" />
      </Box>
      <Box>
        <InputField field="email" />
        <InputField field="password" />
        <InputButton name="Log in" />
      </Box>
    </Container>
  );
};

export default Login;
