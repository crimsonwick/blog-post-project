import React from 'react';
import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      elevation={10}
      sx={{
        m: 1,
        width: '552px',
        marginTop: '100px',
        marginBottom: '30px',
        fontFamily: 'Montserrat',
      }}
    >
      <h1 style={{ textAlign: 'center', margin: 0 }}>Create An Account</h1>
      <p style={{ textAlign: 'center', margin: 0 }}>
        Already have an account?{' '}
        <a
          href="/login"
          style={{ 'text-decoration': 'none', color: 'inherit' }}
        >
          Log in
        </a>
      </p>
    </Box>
  );
}
