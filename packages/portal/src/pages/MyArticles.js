import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { gettingPosts, parseJwt } from '../services/LoginApi';

const MyArticles = () => {
  const [array, setArray] = useState([]);
  const { accessToken } = useContext(AppContext);

  useEffect(() => {
    const allPosts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const userDetails = parseJwt(accessToken);
      const details = await gettingPosts(config, userDetails.user.id);
      if (details.data) setArray(details.data);
    };
    allPosts();
  }, [accessToken, setArray]);
  const myData = []
    .concat(array)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return (
    <>
      <NavBar login={true} />
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="My Articles" />
        <Box mt={5}>
          {myData.length !== 0 ? (
            myData.map((object) => {
              return <ArticleCard key={object.id} object={object._source} />;
            })
          ) : (
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
              No articles to show
            </Typography>
          )}
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default MyArticles;
