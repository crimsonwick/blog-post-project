import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PaginationforPosts } from '../services/LoginApi';
import { AppContextInterface, UserInterface } from '../interface/App';
import {
  LandingPageInterface,
  PostInterfaceForLandingPage,
} from '../interface/App';
import { Loader } from '../components/Loader';

export const Home = () => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<
    LandingPageInterface<PostInterfaceForLandingPage>
  >({
    Posts: [],
    datalength: 0,
    totalPosts: 0,
    totalPages: 0,
  });

  const LIMIT: number = 4;
  const getPaginatedPosts = async () => {
    const response = await PaginationforPosts(page, LIMIT);
    const mergeData = [...posts.Posts, ...response.data.Posts];
    setPosts({
      Posts: mergeData,
      datalength: response.data.datalength,
      totalPosts: response.data.totalPosts,
      totalPages: response.data.totalPages,
    });
  };

  const fetchMore = () => {
    const p = page + 1;
    setPage(p);
    getPaginatedPosts();
  };

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <>
      {context?.loggedIn ? (
        <Navbar login={true} mainPage={true} isNavActive={true} />
      ) : (
        <Navbar mainPage={true} isNavActive={true} />
      )}

      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="Recent Posts" />
        {posts && context?.searchData?.length === 0 ? (
          <InfiniteScroll
            dataLength={posts.Posts.length}
            next={fetchMore}
            hasMore={posts.totalPages >= page}
            loader={<Loader />}
          >
            <Box mt={5}>
              {posts.Posts.map((object, index) => {
                return <ArticleCard object={object} key={index} />;
              })}
            </Box>
          </InfiniteScroll>
        ) : (
          context?.searchData?.map((object) => {
            return <ArticleCard key={object.id} object={object} />;
          })
        )}
      </Container>
    </>
  );
};
