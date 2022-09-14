import { Container } from '@mui/system';
import React from 'react';
import NavBar from '../components/NavBar';
import Article from '../components/Article';
import { Box } from '@mui/system';
import Footer from '../components/Footer';

const MyArticles = () => {
  return (
    <>
      <NavBar />
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
