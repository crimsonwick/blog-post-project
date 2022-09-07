import React from 'react';
import { Container } from '@mui/system';

import Header from '../components/Header';
import { Box } from '@mui/material';

function Login() {
  return (
    <Container maxWidth="sm">
      <Box>
        <Header />
      </Box>
    </Container>
  );
}

export default Login;
