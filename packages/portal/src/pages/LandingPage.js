import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import useInfiniteScrollOnHome from '../components/useInfiniteScrollOnHome';

const Home = () => {
  const { loggedIn } = useContext(AppContext);
  const limit = 4;
  // const [limit, setLimit] = useState(4);
  const [link, setLink] = useState('');

  const { posts, hasMore, loading, error, cursor } = useInfiniteScrollOnHome(
    limit,
    link
  );

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

  // const myData = []
  //   .concat(searchData)
  //   .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return (
    <>
      {loggedIn ? (
        <NavBar style={{ position: 'fixed' }} login={true} />
      ) : (
        <NavBar style={{ position: 'fixed' }} />
      )}

      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="Recent Posts" />
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

export default Home;
