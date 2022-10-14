import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PaginationforPosts } from '../services/LoginApi';

const Home = () => {
  const { loggedIn,searchData } = useContext(AppContext);
  const [page,setPage] = useState(1);
  const [posts,setPosts] = useState({
    Posts: [],
    datalength: 0,
    totalPosts: 0,
    totalPages: 0
  })
  const LIMIT = 4;
  const getPaginatedPosts = async() => {
    const response = await PaginationforPosts(page,LIMIT);
    const mergeData = [...posts.Posts,...response.data.Posts]
    setPosts({
      Posts: mergeData,
      datalength: response.data.datalength,
      totalPosts: response.data.totalPosts,
      totalPages: response.data.totalPages
    });
  }
  const fetchMore = () => {
      const p = page + 1;  
      setPage(p);
      getPaginatedPosts();
  }
   useEffect(() => {
      fetchMore();
   },[])
  
  return (
    <>
      {loggedIn ? (
        <NavBar style={{ position: 'fixed' }} login={true}  mainPage={true}/>
      ) : (
        <NavBar style={{ position: 'fixed' }} mainPage={true}/>
      )}

      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="Recent Posts" />
        {(posts && searchData.length === 0)?(
          <InfiniteScroll dataLength={posts.Posts.length} next={fetchMore} hasMore={posts.totalPages >= page} loader={<h4>Loading...</h4>}>
          <Box mt={5}>
            {posts.Posts.map((post, index) => {
              return <ArticleCard object={post} key={index} />;
            })}
          </Box>
      </InfiniteScroll>
        ):(
          searchData.map((object) => {
            return (
              <ArticleCard
                key={object._source.id}
                object={object._source}
              />
            );
          })
        )
      }
      </Container>
    </>
  );
};

export default Home;
