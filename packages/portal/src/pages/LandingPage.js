import React, { useState, useEffect } from 'react';
import NavBarX from '../components/NavBarX';
import Container from '@mui/material/Container';
import { Box, Divider } from '@mui/material';
import Article from '../components/Article';
import Footer from '../components/Footer';
import { allPostsComing } from '../services/LoginApi';

const Home = () => {
  const [data, setData] = useState([]);
  const allPosts = async () => {
    const details = await allPostsComing();
    setData(details.data);
  };

  useEffect(() => {
    const data = localStorage.getItem('LANDING_PAGE_POSTS_DATA');
    if (data !== null) setData(JSON.parse(data));
  }, []);

  useEffect(() => {
    allPosts();
    console.log('API was called');
    window.localStorage.setItem(
      'LANDING_PAGE_POSTS_DATA',
      JSON.stringify(data)
    );
  }, []);
  return (
    <>
      <NavBarX />
      <Container sx={{ marginY: 5 }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>All Posts</h1>
        <Divider />

        <Box mt={5}>
          {data &&
            data.map((object) => {
              return <Article key={object.id} object={object} />;
            })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
