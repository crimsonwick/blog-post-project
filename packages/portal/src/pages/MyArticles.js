import { Container } from '@mui/system';
import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { Box } from '@mui/system';
import Footer from '../components/Footer';
import { Divider, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { useState, useEffect, useContext } from 'react';
import { gettingPosts, parseJwt } from '../services/LoginApi';
import { AppContext } from '../App';

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
      const details = await gettingPosts(config,userDetails.user.id);
      if (details.data.length) setArray(details.data);
    }
    allPosts();
  }, [accessToken,setArray]);
  return (
    <>
      <NavBar login={true} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          My Articles
        </h1>
        <Divider />
        <Box mt={5}>
          {array.length !== 0 ? (
            array.map((object) => {
              return <ArticleCard key={object._source.id} object={object._source} />;
            })
          ) : (
            <Typography sx={{ fontFamily: 'Poppins' }}>
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
