import { Container } from '@mui/system';
import React from 'react';
import Navbar from '../components/NavBar';
import Article from '../components/Article';
import { Box } from '@mui/system';
import Footer from '../components/Footer';

const MyArticles = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box mt={5}>
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default MyArticles;
