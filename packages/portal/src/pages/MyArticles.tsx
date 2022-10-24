import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import {
  AppContextInterface,
  SearchMyDataInterface,
  UserInterface,
} from '../interface/App';
import { gettingPosts } from '../services/LoginApi';
export const MyArticles = () => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const [posts, setPosts] = useState<SearchMyDataInterface[]>([]);

  useEffect(() => {
    const getMyPosts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
      const response = await gettingPosts(
        config,
        context?.userData.id as unknown as string
      );
      setPosts(response.data);
    };
    getMyPosts();
  }, [context?.accessToken, context?.userData]);

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
          {posts && context?.searchMyData?.length === 0
            ? posts.map((post, index) => {
                return <ArticleCard object={post._source} key={index} />;
              })
            : context?.searchMyData?.map((object) => {
                return (
                  <ArticleCard
                    key={object._source.id}
                    object={object._source}
                  />
                );
              })}
        </Box>
      </Container>
    </>
  );
};
