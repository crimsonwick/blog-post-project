import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import { allPostsComing } from '../services/LoginApi';
import { AppContext } from '../App';
import { PostsHeader } from '../components/PostsHeader';

const Home = () => {
  const [data, setData] = useState([]);
  const { loggedIn, searchData } = useContext(AppContext);
  const allPosts = async () => {
    const details = await allPostsComing();
    setData(details.data);
  };
  useEffect(() => {
    allPosts();
    console.log('API was called');
  }, []);

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
          {data ? (
            data.map((object) => {
              return <ArticleCard key={object.id} object={object} />;
            })
          ) : searchData ? (
            searchData.map((object) => {
              return (
                <ArticleCard key={object._source.id} object={object._source} />
              );
            })
          ) : (
            <Typography
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            ></Typography>
          )}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
