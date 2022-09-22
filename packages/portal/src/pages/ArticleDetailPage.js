import { Container } from '@mui/system';
import React from 'react';
import NavBarX from '../components/NavBarX';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleDetail from '../components/ArticleDetail';
import AddComment from '../components/AddComment';

export default function ArticleDetailPage() {
  return (
    <>
      <NavBarX login={true} />
      <Container maxWidth="lg">
        <Box mb={5}>
          <ArticleDetail />
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
