import { Container } from '@mui/system';
import React from 'react';
import Article from '../components/Article';
import NavBar from '../components/NavBar';
import Comment from '../components/Comment';
import { Box } from '@mui/material';

const ArticleDetail = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Box>
          <Article />
        </Box>
        <Box mt={2}>
          <Comment count={3} />
        </Box>
      </Container>
      ;
    </>
  );
};

export default ArticleDetail;
