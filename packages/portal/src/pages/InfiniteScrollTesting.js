import useInfiniteScroll from '../components/useInfiniteScroll';
import { useState, useRef, useCallback } from 'react';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import { PostsHeader } from '../components/PostsHeader';
import NavBar from '../components/NavBar';
import { useContext } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import { Typography } from '@mui/material';

const InfiniteScrollTesting = () => {
  const { loggedIn } = useContext(AppContext);
  const [limit, setLimit] = useState(4);
  const [link, setLink] = useState('');

  const { posts, hasMore, loading, error, cursor } = useInfiniteScroll(
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
    [loading, hasMore]
  );

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
              return <ArticleCard ref={lastPost} object={post} key={post.id} />;
            }
            return <ArticleCard object={post} key={post.id} />;
          })}
          <Typography>{loading && 'Loading...'}</Typography>
          <Typography>{error && 'Error'}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default InfiniteScrollTesting;
