import { Container } from '@mui/system';
import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { Box } from '@mui/system';
import Footer from '../components/Footer';
import { Divider } from '@mui/material';
import NavBar from '../components/NavBar';
import { useState, useEffect, useContext } from 'react';
import { gettingPosts, parseJwt } from '../services/LoginApi';
import { AppContext } from '../App';

const MyArticles = () => {
  const [data, setData] = useState([]);
  const { accessToken,searchMyData } = useContext(AppContext);

  useEffect(() => {
    const allPosts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const userDetails = parseJwt(accessToken);
      const details = await gettingPosts(config,userDetails.user.id);
      if (details.data.length) setData(details.data);
      console.log(details.data)
    }
    allPosts();
  }, [accessToken,setData]);
  return (
    <>
      <NavBar login={true} mainPage={false}/>
      <Container maxWidth="lg" sx={{ position: 'relative', marginY: 10 }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          My Articles
        </h1>
        <Divider />
        <Box mt={5}>
        {data && searchMyData.length === 0
            ? data.map((object) => {
                return <ArticleCard key={object._source.id} object={object._source} />;
              })
            : searchMyData.map((object) => {
                return (
                  <ArticleCard
                    key={object._source.id}
                    object={object._source}
                  />
                );
              })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default MyArticles;
