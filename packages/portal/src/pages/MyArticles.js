import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import useInfiniteScrollOnMyArticles from '../components/useInfiniteScrollOnMyArticles';
import { parseJwt } from '../services/LoginApi';

const MyArticles = () => {
  const { accessToken } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const userDetails = parseJwt(accessToken);
  const userId = userDetails.user.id;

  const limit = 4;
  // const [limit, setLimit] = useState(4);
  const [link, setLink] = useState('');

  const { posts, hasMore, loading, error, cursor } =
    useInfiniteScrollOnMyArticles(limit, link, userId, config);

  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Visible');
          setLink(cursor.current);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore, cursor]
  );

  // const sortedPosts = []
  //   .concat(posts)
  //   .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <>
      <NavBar login={true} mainPage={false}/>
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="My Articles" />
        <Box mt={5}>
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return <ArticleCard ref={lastPost} object={post} key={index} />;
            }
            return <ArticleCard object={post} key={index} />;
          })}
          <Typography>{loading && 'Loading...'}</Typography>
          <Typography>{error && 'Error'}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default MyArticles;
