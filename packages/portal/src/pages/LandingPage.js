import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Box, Divider, Typography } from '@mui/material';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import { allPostsComing } from '../services/LoginApi';
import NavBar from '../components/NavBar';

const Home = () => {
  const [data, setData] = useState([]);
  const allPosts = async () => {
    const details = await allPostsComing();
    setData(details.data);
  };

  // useEffect(() => {
  //   const data = localStorage.getItem('LANDING_PAGE_POSTS_DATA');
  //   if (data !== null) setData(JSON.parse(data));
  // }, []);

  useEffect(() => {
    allPosts();
    console.log('API was called');
    // window.localStorage.setItem(
    //   'LANDING_PAGE_POSTS_DATA',
    //   JSON.stringify(data)
    // );
  }, []);
  return (
    <>
      <NavBar login={true} />
      <Container sx={{ marginY: 5 }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>All Posts</h1>
        <Divider />

        <Box mt={5}>
          {data ? (
            data.map((object) => {
              return <ArticleCard key={object.id} object={object} />;
            })
          ) : (
            <Typography> No articles to show</Typography>
          )}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
