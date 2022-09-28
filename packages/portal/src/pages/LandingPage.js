import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Container from '@mui/material/Container';
import { Box, Divider } from '@mui/material';
import Article from '../components/Article';
import Footer from '../components/Footer';
import { allPostsComing } from '../services/LoginApi.js';
import { AppContext } from '../App';

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
  return (
    <>
      {loggedIn ? (
        <NavBar style={{ position: 'fixed' }} login={true} />
      ) : (
        <NavBar style={{ position: 'fixed' }} />
      )}

      <Container sx={{ marginY: 20 }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          Recent Posts
        </h1>
        <Divider />
        <Box mt={5}>
          {data && searchData.length === 0
            ? data.map((object) => {
                return <Article key={object.id} object={object} />;
              })
            : searchData.map((object) => {
                return (
                  <Article key={object._source.id} object={object._source} />
                );
              })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
