import { Container } from '@mui/system';
import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { Box } from '@mui/system';
import Footer from '../components/Footer';
import { Divider, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { useState, useEffect, useContext } from 'react';
import { gettingPosts } from '../services/LoginApi';
import { AppContext } from '../App';

const MyArticles = () => {
  const [array, setArray] = useState([]);
  const { accessToken } = useContext(AppContext);

  const allPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const details = await gettingPosts(config);
    if (details.data.length) setArray(details.data);
  };

  // useEffect(() => {
  //   const data = localStorage.getItem('LANDING_PAGE_POSTS_DATA');
  //   if (data !== null) setArray(JSON.parse(data));
  // }, []);

  useEffect(() => {
    allPosts();
    // console.log('API was called');
    // window.localStorage.setItem('MY_ARTICLES_PAGE_DATA', JSON.stringify(array));
  }, []);
  return (
    <>
      <NavBar login={true} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          My Articles
        </h1>
        <Divider />
        <Box mt={5}>
          {array.length !== 0 ? (
            array.map((object) => {
              return <ArticleCard key={object.id} object={object} />;
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
