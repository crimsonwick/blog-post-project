import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import authAxios from '../interceptor/authAxios';
import { Alerts } from '../components/Alerts';
import { BasicTable } from '../components/BasicTable';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { AppContext } from '../context/AppContext';
import { AppContextInterface } from '../interface/App';
import { parseJwt } from '../services/LoginApi';
import Avatar from '@mui/material/Avatar';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useParams } from 'react-router-dom';

export const AccountDetails = () => {
  const { userId } = useParams();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ddutykcuf',
    },
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const context: AppContextInterface | null = useContext(AppContext);
  useEffect(() => {
    localStorage.setItem('link', `/account-details/${userId}`);
  }, []);

  /**
   * Handle Submit
   * @param e
   * @returns
   */
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      if (image) {
        formData.append('file', image);
      }

      if (
        image &&
        !(
          image.type === 'image/png' ||
          image.type === 'image/jpg' ||
          image.type === 'image/jpeg'
        )
      ) {
        Alerts.error('Upload png/jpg/jpeg please');
        return;
      }
      const parsetoken = parseJwt(context?.accessToken as string);
      const user = parsetoken.user;
      const userId = JSON.parse(localStorage.getItem('uuid') || '{}');
      console.log(userId);
      context?.setUserData(user);
      setLoading(true);
      const response = await authAxios.put(`/users/${userId}`, formData);
      console.log('response.data::: ', response.data);
      setLoading(false);
      if (response) {
        context?.setDp(response.data.image);
        setImage(null);
        localStorage.setItem('avatar', JSON.stringify(response.data.image));
        Alerts.success('Dp uploaded');
      }
    } catch (error: any) {
      if (error && error?.request && error?.request?.status === 401) {
        Alerts.error('Session Expired. Please refresh to continue');
        setLoading(false);
      }
      console.log(error);
    }
  };
  /**
   * Handles File Change
   * @param e
   * @returns
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    setImage(e.target.files[0]);
  };

  /**
   * Remove file from image state
   * @returns
   */
  const removeFile = () => () => {
    setImage(null);
  };

  return (
    <>
      <Navbar login={true} mainPage={false} />
      <Container sx={{ marginY: 2 }}>
        <Box mb={2}>
          <PostsHeader name='Account Details' />
        </Box>
        <BasicTable />
        <Box mt={2}>
          <PostsHeader name='Change Display Picture' />
          {!loading && (
            <Box component='form' onSubmit={handleSubmit}>
              <Box mt={3}>
                {context?.dp ? (
                  <AdvancedImage
                    cldImg={cld.image(`main/uploads/${context?.dp}`)}
                    style={{ width: 286, height: 286, borderRadius: '50%' }}
                    alt='dp'
                  />
                ) : (
                  <Avatar
                    src={''}
                    alt='dp'
                    sx={{ width: 286, height: 286, borderRadius: '50%' }}
                  />
                )}
              </Box>

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

              {image && (
                <Box mt={3}>
                  <div
                    style={{
                      display: 'inline-flex',
                      borderRadius: 2,
                      border: '1px solid #eaeaea',
                      marginBottom: 8,
                      marginRight: 8,
                      width: 100,
                      height: 100,
                      padding: 4,
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginTop: 16,
                        }}
                      >
                        {image && (
                          <img
                            src={URL.createObjectURL(image)}
                            alt='image_preview'
                            style={{
                              display: 'block',
                              width: 'auto',
                              height: '100%',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Box>
              )}

              {image && (
                <Box mt={1}>
                  <button onClick={removeFile()}>Remove File</button>
                </Box>
              )}
            </Box>
          )}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </Box>
      </Container>
    </>
  );
};
