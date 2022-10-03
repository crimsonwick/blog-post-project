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
        fontFamily: 'Poppins',
      }}
    >
      <h1 style={{ textAlign: 'center', margin: 0 }}>{props.heading}</h1>
      <p style={{ textAlign: 'center', margin: 0, color: 'black' }}>
        {props.desc}
        {props.link && (
          <Link
            to={props.link}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Log in
          </Link>
        )}
      </p>
    </Box>
  );
};

export default Header;
