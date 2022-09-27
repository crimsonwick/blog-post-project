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

  const { loggedIn } = useContext(AppContext)
  const allPosts = async () => {
    const details = await allPostsComing();
    setData(details.data)
  }

  useEffect(() => {
    allPosts();
  }, []);
  return (
    <>
      {(loggedIn) ? (<NavBar login={true} />) : (<NavBar />)}

      <Container sx={{ marginY: 5 }}>
        <h1 style={{ fontFamily: "Poppins", marginTop: "65px" }}>Recent Posts</h1>
        <Divider></Divider>

        <Box mt={5}>
          {data && data.map((object) => {
            return (
              <Article key={object._id} object={object} />
            )
          })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
