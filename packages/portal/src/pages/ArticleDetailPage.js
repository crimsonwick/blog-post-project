import { Container } from '@mui/system';
import React from 'react';
import NavBarX from '../components/NavBarX';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleDetail from '../components/ArticleDetail';
import AddComment from '../components/AddComment';

const ArticleDetailPage = () => {
  return (
    <>
      <NavBarX login={true} />
      <Container maxWidth="lg">
        {/* <button onClick={() => alert(JSON.stringify(location.state.object))}> */}
        Click ME!
        {/* </button> */}
        {/* <button onClick={() => alert(JSON.stringify(data))}>Click ME 2</button> */}
        <Box mb={5}>
          <ArticleDetail />
        </Box>
        <Box>
          {/* <AddComment postId={location.state.object.id} refreshComments={allComments}/> */}
        </Box>
        <Box mt={3}>
          {/* <Comment count={4} object={location.state.object} /> */}
          {/* {data.map((object) => {
            return <Comment key={object._id} count={4} object={object} />;
          })} */}
        </Box>
      </Container>
    </>
  );
};

export default ArticleDetailPage;
