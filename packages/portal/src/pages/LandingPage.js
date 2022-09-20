import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
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
    allPosts();
  }, []);
  return (
    <>
      <NavBar />
      <Container sx={{ marginY: 5 }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>All Posts</h1>
        <Divider />

        <Box mt={5}>
          {data &&
            data.map((object) => {
              return <Article key={object._id} object={object} />;
            })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
