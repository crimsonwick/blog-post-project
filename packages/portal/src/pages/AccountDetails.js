import { Button, Divider, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import BasicTable from '../components/BasicTable';
import NavBar from '../components/NavBar';
import { parseJwt } from '../services/LoginApi';
import { Alerts } from "../components/Alerts"

const AccountDetails = () => {
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');
  const { accessToken, setUser, setDp } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('file', image.data);
      const parsetoken = parseJwt(accessToken);
      const user = parsetoken.user;
      setUser(user);
      const response = await fetch(`http://localhost:5000/user/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response) {
        setStatus(response.statusText);
        const imageObj = await response.json();
        if (imageObj) setDp(imageObj.image);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleSubmitAlert = () => {
    Alerts.success("Uploaded Successfully");
  }

  return (
    <>
      <NavBar login={true} />
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
              onClick={handleSubmitAlert}
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
