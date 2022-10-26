import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import useInfiniteScrollOnHome from '../components/useInfiniteScrollOnHome';
import { AppContext } from '../context/AppContext';
import { AppContextInterface, UserInterface } from '../interface/App';

export const Home = () => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const limit = 4;
  const [link, setLink] = useState('');

  const { posts, hasMore, loading, error, cursor } = useInfiniteScrollOnHome(
    limit,
    link
  );

  const observer: React.MutableRefObject<IntersectionObserver | undefined> =
    useRef();
  const lastPost = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Visible');
          setLink(cursor?.current);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore, cursor]
  );

  return (
    <>
      {context?.loggedIn ? (
        <Navbar login={true} mainPage={true} isNavActive={true} />
      ) : (
        <Navbar mainPage={true} isNavActive={true} />
      )}

      <Container sx={{ marginY: 10 }}>
        <PostsHeader name='Recent Posts' />
        {posts && context?.searchData?.length === 0 ? (
          <Box mt={5}>
            {posts.map((post, index) => {
              if (posts.length === index + 1) {
                return <ArticleCard ref={lastPost} object={post} key={index} />;
              }
              return <ArticleCard object={post} key={index} />;
            })}
            {loading && <Loader />}
            {error && (
              <Typography sx={{ marginTop: '20px' }} align='center'>
                Error occured in loading post...
              </Typography>
            )}
          </Box>
        ) : (
          context?.searchData?.map((object) => {
            return <ArticleCard key={object.id} object={object} />;
          })
        )}
        {!loading && !hasMore && (
          <Typography sx={{ marginTop: '20px' }} align='center'>
            No more articles to show...
          </Typography>
        )}
      </Container>
    </>
  );
};
