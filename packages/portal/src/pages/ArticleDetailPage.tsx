import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AddComment } from '../components/AddComment';
import { ArticleDetail } from '../components/ArticleDetail';
import { Comment } from '../components/Comment';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { AppContextInterface, UserInterface } from '../interface/App';
import { PostInterface } from '../interface/ArticleDetailPage';
import { CommentInterface } from '../services/CommentApi';
import { getComments } from '../services/LoginApi';

export const ArticleDetailPage = () => {
  const location = useLocation();
  const { object } = location.state as PostInterface;
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const [data, setData] = useState<CommentInterface[]>([]);

  const allComments = async (id: string) => {
    const response = await getComments(id);
    setData(response.data);
  };
  useEffect(() => {
    if (object) {
      allComments(object.id);
    }
  }, [object]);
  return (
    <>
      {context?.loggedIn ? <Navbar login={true} /> : <Navbar />}
      <Container sx={{ marginTop: 9 }}>
        <Box>
          <ArticleDetail object={object} />
        </Box>
        <Box sx={{ marginTop: '72px', marginBottom: '24px' }}>
          <PostsHeader count={data.length} name="comments" textSize="24px" />
        </Box>
        <Box>
          <AddComment
            width="1000px"
            postObject={object}
            placeholder="Write a comment..."
            labelAbove="Add Comment"
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
