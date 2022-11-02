import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import authAxios from '../auth/authAxios';
import { Alerts } from '../components/Alerts';
import { BasicTable } from '../components/BasicTable';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { AppContext } from '../context/AppContext';
import { AppContextInterface } from '../interface/App';
import { parseJwt } from '../services/LoginApi';

export const AccountDetails = () => {
  const [image, setImage] = useState<File | null>(null);
  const context: AppContextInterface | null = useContext(AppContext);
  useEffect(() => {
    localStorage.setItem('link', '/account-details');
  }, []);

  /**
   * Handle Submit
   * @param e
   * @returns
   */
  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    e.preventDefault();
    if (context) {
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

        if (!context.accessToken) {
          return;
        }
        const parsetoken = parseJwt(context.accessToken);
        const user = parsetoken.user;
        context.setUserData(user);
        const response = await authAxios.put(`/users/${user.id}`, formData);
        console.log('response.data::: ', response.data);
        if (response.data) {
          context.setDp(response.data.image);
          Alerts.success('Dp uploaded');
        }
      } catch (err) {
        console.log(err);
      }
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
                    style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 16,
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt='image_preview'
                        style={{
                          display: 'block',
                          width: 'auto',
                          height: '100%',
                        }}
                      />
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
        </Box>
      </Container>
    </>
  );
};
