import { Container } from '@mui/system';
import React from 'react';
// import Article from '../components/Article';
import NavBar from '../components/NavBar';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleBig from '../components/ArticleBig';

const ArticleDetail = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Box mb={5}>
          <ArticleBig />
        </Box>
        <Comment count={4} />
        <Comment count={4} />;
      </Container>
    </>
  );
};

export default ArticleDetail;
