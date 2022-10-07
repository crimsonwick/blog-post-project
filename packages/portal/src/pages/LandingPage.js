import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import NavBar from '../components/NavBar';
import PaginatedItems from '../components/PaginatedItems';
import { PostsHeader } from '../components/PostsHeader';
import { allPostsComing } from '../services/LoginApi';

const Home = () => {
  const [data, setData] = useState([]);
  const { loggedIn, searchData } = useContext(AppContext);
  const allPosts = async () => {
    const details = await allPostsComing();
    setData(details.data);
  };
  useEffect(() => {
    allPosts();
  }, []);

  const myData = []
    .concat(searchData)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

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
          {Array.isArray(myData) &&
          Array.isArray(searchData) &&
          searchData.length === 0 ? (
            <PaginatedItems data={myData} />
          ) : (
            searchData.map((object) => {
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

export default Home;
