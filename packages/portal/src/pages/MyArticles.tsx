import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import useInfiniteScrollOnMyArticles from '../components/useInfiniteScrollOnMyArticles';
import { AppContext } from '../context/AppContext';
import { AppContextInterface } from '../interface/App';
export const MyArticles = () => {
  const context: AppContextInterface | null = useContext(AppContext);
  const limit = 4;
  const [link, setLink] = useState('');
  const userId = JSON.parse(localStorage.getItem('userDetails') || '{}')
    .id as unknown as string;

  const { posts, hasMore, loading, cursor, error } =
    useInfiniteScrollOnMyArticles(limit, link, userId);

  const observer: React.MutableRefObject<IntersectionObserver | undefined> =
    useRef();
  const lastPost = useCallback(
    (node: any) => {
      // cannot define type of node
      if (loading) return;
      if (observer.current) observer.current?.disconnect();
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

  return (
    <>
      {context?.loggedIn ? (
        <Navbar login={true} isMyActive={true} />
      ) : (
        <Navbar isMyActive={true} />
      )}
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name='My Articles' />

        {posts && context?.searchMyData?.length === 0 ? (
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
          context?.searchMyData?.map((object) => {
            return (
              <ArticleCard key={object._source.id} object={object._source} />
            );
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
