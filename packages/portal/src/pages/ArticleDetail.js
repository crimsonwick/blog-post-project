import { Container } from '@mui/system';
import React from 'react';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleBig from '../components/ArticleBig';
import AddComment from '../components/AddComment';

export default function ArticleDetail() {
  return (
    <>

      <Container maxWidth="lg">
        <Box mb={5}>
          <ArticleBig />
        </Box>
        <Box>
          <AddComment />
        </Box>
        <Box mt={3}>
          <Comment count={4} />
          <Comment count={4} />
        </Box>
      </Container>
    </>
  );
}
