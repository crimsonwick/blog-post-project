import { Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Comment from '../components/Comment';
import { Box } from '@mui/material';
import ArticleDetail from '../components/ArticleDetail';
import AddComment from '../components/AddComment';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import { getComments } from '../services/LoginApi';
import { PostsHeader } from '../components/PostsHeader';

const ArticleDetailPage = () => {
  const location = useLocation();
  const { object } = location.state;
  const { loggedIn } = useContext(AppContext);
  const [data, setData] = useState([]);

  const allComments = async (id) => {
    const response = await getComments(id);
    setData(response.data);
  };
  useEffect(() => {
    allComments(object.id);
  }, [object]);
  return (
    <>
      {loggedIn ? <NavBar login={true} /> : <NavBar />}
      <Container sx={{ marginY: 9 }}>
        <Box>
          <ArticleDetail object={object} />
        </Box>
        <Box sx={{ marginTop: '72px', marginBottom: '24px' }}>
          <PostsHeader count={data.length} name="comments" textSize="24px" />
        </Box>
        <Box>
          <AddComment
            object={object}
            refreshComment={allComments}
            Comment={true}
          />
        </Box>
        <Box mt={3}>
          {data.length > 0 &&
            data.map((o) => {
              return <Comment key={o.id} object={o} />;
            })}
        </Box>
      </Container>
    </>
  );
};

export default ArticleDetailPage;
