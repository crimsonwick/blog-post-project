import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Alerts } from '../components/Alerts';
import BasicTable from '../components/BasicTable';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { parseJwt } from '../services/LoginApi';

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
      if (response) setStatus(response.status);
      const imageObj = await response.json();
      if (imageObj) {
        setDp(imageObj.image);
        Alerts.success('Dp uploaded');
      } else {
        Alerts.warning('Image not uploaded');
      }
    } catch (err) {
      console.log(status, err);
    }
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
      <NavBar login={true} />
      <Container sx={{ marginY: 10 }}>
        <Box mb={3}>
          <PostsHeader name="Account Details" />
        </Box>
        <BasicTable />
        <Box mt={7}>
          <PostsHeader name="Change Display Picture" />
          <Box component="form" onSubmit={handleSubmit}>
            <Button
              variant="contained"
              component="label"
              sx={{
                borderRadius: '20px',
                width: '12%',
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
                width: '12%',
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
