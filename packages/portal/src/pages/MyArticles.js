import { Container } from '@mui/system';
import React from 'react';
import Article from '../components/Article';
import { Box } from '@mui/system';
import Footer from '../components/Footer';
import { Divider, Typography } from '@mui/material';
import NavBarX from '../components/NavBarX';
import { useState, useEffect, useContext } from 'react';
import { gettingPosts } from '../services/LoginApi';
import { AppContext } from '../App';

const MyArticles = () => {
  const [array, setArray] = useState([]);
  const { getAccessToken } = useContext(AppContext);

  const allPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    };
    const details = await gettingPosts(config);
    if (details.data.length) setArray(details.data);
  };

  useEffect(() => {
    allPosts();
  }, []);

  return (
    <>
      <NavBarX login={true} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          My Articles
        </h1>
        <Divider />

        <Box mt={5}>
          {array.length !== 0 ? (
            array.map((object) => {
              return <Article key={object.id} object={object} />;
            })
          ) : (
            <Typography sx={{ fontFamily: 'Poppins' }}>
              No articles to show
            </Typography>
          )}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default MyArticles;
