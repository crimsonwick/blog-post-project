import React from 'react';
import Pagination from '@mui/material/Pagination';

const Footer = () => {
  return (
    <Pagination
      count={10}
      variant="outlined"
      shape="rounded"
      style={{
        bottom: 0,
        width: '100%',
        marginBottom: '20px',
        marginTop: '20px',
      }}
    />
  );
};

export default Footer;
