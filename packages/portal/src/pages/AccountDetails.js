import React from 'react';
import NavBarX from '../components/NavBarX';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import BasicTable from '../components/BasicTable';
import UploadButton from '../components/UploadButton';
import { useState } from 'react';
import { Button } from '@mui/material';

const AccountDetails = () => {
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    });
    if (response) setStatus(response.statusText);
  };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

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
          <Box component="form" onSubmit={handleSubmit}>
            <Button
              variant="contained"
              component="label"
              sx={{
                borderRadius: '20px',
                width: '10%',
                fontFamily: ['Poppins', 'serif'].join(','),
                fontSize: 18,
                marginTop: '25px',
                height: '56px',
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
              color="secondary"
            >
              Upload
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                marginLeft: '10px',
                width: '10%',
                fontFamily: ['Poppins', 'serif'].join(','),
                fontSize: 18,
                marginTop: '25px',
                height: '56px',
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AccountDetails;
