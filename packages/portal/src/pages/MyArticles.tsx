import { Box, Container } from '@mui/system';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { AppContextInterface, UserInterface } from '../interface/App';
import useInfiniteScrollOnMyArticles from '../components/useInfiniteScrollOnMyArticles';
import { Typography } from '@mui/material';
export const MyArticles = () => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const limit = 4;
  const [link, setLink] = useState('');
  const config = {
    headers: {
      Authorization: `Bearer ${context?.accessToken}`,
    },
  };
  const userId = context?.userData.id as unknown as string;

  const { posts, hasMore, loading, cursor, error } =
    useInfiniteScrollOnMyArticles(limit, link, userId, config);

  const observer: React.MutableRefObject<IntersectionObserver | undefined> =
    useRef();
  const lastPost = useCallback(
    (node: any) => {
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
        <Navbar login={true} mainPage={false} isMyActive={true} />
      ) : (
        <Navbar mainPage={false} isMyActive={true} />
      )}
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="My Articles" />
        <Box mt={5}>
          {posts && context?.searchMyData?.length === 0 ? (
            <Box mt={5}>
              {posts.map((post, index) => {
                if (posts.length === index + 1) {
                  return (
                    <ArticleCard ref={lastPost} object={post} key={index} />
                  );
                }
                return <ArticleCard object={post} key={index} />;
              })}
              <Typography>{loading && 'Loading...'}</Typography>
              <Typography>{error && 'Error'}</Typography>
            </Box>
          ) : (
            context?.searchMyData?.map((object) => {
              return (
                <ArticleCard key={object._source.id} object={object._source} />
              );
            })
          )}
        </Box>
      </Container>
    </>
  );
};
