import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Alerts } from '../components/Alerts';
import { BasicTable } from '../components/BasicTable';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { parseJwt } from '../services/LoginApi';
import axios from 'axios';
import { ImageInterface } from '../interface/App';
import { AppContextInterface, UserInterface } from '../interface/App';

export const AccountDetails = () => {
  const [image, setImage] = useState<ImageInterface>({ preview: '', data: '' });
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('file', image.data);
      const parsetoken = parseJwt(context?.accessToken as unknown as string);
      const user = parsetoken.user;
      context?.setUserData(user);
      const config = {
        headers: {
          Authorization: `Bearer ${context?.accessToken}`,
        },
      };
      const response = await axios.put(
        `http://localhost:5000/users/${user.id}`,
        formData,
        config
      );
      if (response.data) {
        context?.setDp(response.data.image);
        Alerts.success('Dp uploaded');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    const img: ImageInterface = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <>
      <Navbar login={true} mainPage={false} />
      <Container sx={{ marginY: 10 }}>
        <Box mb={3}>
          <PostsHeader name='Account Details' />
        </Box>
        <BasicTable />
        <Box mt={7}>
          <PostsHeader name='Change Display Picture' />
          <Box component='form' onSubmit={handleSubmit}>
            <Button
              variant='contained'
              component='label'
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
              color='secondary'
            >
              Upload
              <input
                type='file'
                name='file'
                onChange={handleFileChange}
                hidden
              />
            </Button>
            <Button
              variant='contained'
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
              type='submit'
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
