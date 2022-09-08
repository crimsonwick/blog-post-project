import React from 'react';
import { Box } from '@mui/material';

export default function Header(props) {
  return (
    <Box
      elevation={10}
      sx={{
        width: '552px',
        fontFamily: 'Montserrat',
      }}
    >
      <h1 style={{ textAlign: 'center', margin: 0 }}>{props.heading}</h1>
      <p style={{ textAlign: 'center', margin: 0 }}>
        {props.desc}
        <a href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          {props.link}
        </a>
      </p>
    </Box>
  );
}
