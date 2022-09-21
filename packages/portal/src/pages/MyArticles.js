import { Container } from '@mui/system';
import React from 'react';
import Article from '../components/Article';
import { Box } from '@mui/system';
import Footer from '../components/Footer';
import { Divider, Typography } from '@mui/material';
import NavBarX from '../components/NavBarX';
import { useState, useEffect, useContext } from 'react';
import { gettingPosts } from '../services/LoginApi';
import { AppContext } from '../App';
import axios from 'axios';

const MyArticles = () => {
  const [array, setArray] = useState([]);
  const [bool, setBool] = useState(true);
  const { getAccessToken } = useContext(AppContext);

  const allPosts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    };

    // axios.get('http://localhost:5000/post', config).then((response) => {
    //   setArray(response.data);
    //   console.log('API WAS CALLED');
    //   console.log(array, typeof array);
    // });
    try {
      const details = await gettingPosts(config);
      if (details.data.length) setArray(details.data);
    } catch (error) {
      console.log(error);
    }

    // checkEmptyArray();
  };

  useEffect(() => {
    allPosts();
  }, []);

  // const checkEmptyArray = () => {
  //   if (Object.keys(array).length === 0) setBool(false);
  // };
  return (
    <>
      <NavBarX login={true} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          My Articles
        </h1>
        <Divider />

        <Box mt={5}>
          {array.length !== 0 ? (
            array.map((object) => {
              return <Article key={object.id} object={object} />;
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
