import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import useInfiniteScrollOnMyArticles from '../components/useInfiniteScrollOnMyArticles';
import { gettingPosts } from '../services/LoginApi';

const MyArticles = () => {
  const { accessToken,searchMyData,userData } = useContext(AppContext);
  const [posts,setPosts] = useState([])
  const getMyPosts = async() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await gettingPosts(config,userData.id);
    setPosts(response.data)
  }
  useEffect(() => {
    getMyPosts()
  },[])

  return (
    <>
      <NavBar login={true} mainPage={false}/>
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="My Articles" />
        <Box mt={5}>
          {(posts && searchMyData.length === 0)? (
            posts.map((post, index) => {
              return <ArticleCard object={post._source} key={index} />;
            })
          ): (
            searchMyData.map((object) => {
              return (
                <ArticleCard
                  key={object._source.id}
                  object={object._source}
                />
              );
            })
          )}
        </Box>
      </Container>
    </>
  );
};

export default MyArticles;
