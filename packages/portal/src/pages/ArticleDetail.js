import { Container } from '@mui/system';
import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleBig from '../components/ArticleBig';
import AddComment from '../components/AddComment';
import { AppContext } from '../App';

const ArticleDetail = () => {
  const { loggedIn } = useContext(AppContext)
  return (
    <>
      {(loggedIn) ? (<NavBar login={true} />) : (<NavBar />)}
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
};

export default ArticleDetail;
