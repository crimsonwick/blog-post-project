import React from 'react';
import NavBarX from '../components/NavBarX';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import BasicTable from '../components/BasicTable';

const AccountDetails = () => {
  return (
    <>
      <NavBarX login={true} />
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '20px' }}>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
            Account Details
          </Typography>
          <Divider sx={{ marginBottom: '30px' }} />
          <BasicTable />
        </Box>
        <Box sx={{ marginTop: '40px' }}>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
            Change Display Picture
          </Typography>
          <Divider />
        </Box>
      </Container>
    </>
  );
};

export default AccountDetails;
