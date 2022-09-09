import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <Box
      mt={20}
      mb={5}
      sx={{
        width: '100%',
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
};

export default Header;
