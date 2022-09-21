import { Container } from '@mui/system';
import React from 'react';
import Article from '../components/Article';
import { Box } from '@mui/system';
import Footer from '../components/Footer';
import { Divider } from '@mui/material';
import NavBarX from '../components/NavBarX';
import { useState, useEffect, useContext, AppContext } from 'react';
// import { Link as RouterLink } from 'react-router-dom'
// import Link from '@material-ui/core/Link'


const MyArticles = () => {
    
//const [data,setData] = useState([]);
//const { getAccessToken } = useContext(AppContext)

// const getAllPosts = async() => {
//   const config = {headers: {
//     "Authorization" : `Bearer ${getAccessToken}`
//   }}
//   // const details = await gettingPosts(config);
//   console.log(details.data);
// }
// useEffect(() => {
//   getAllPosts();
// },[])

  return (
    <>
      {/* <NavBarX login={true}></NavBarX> */}

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <h1 style={{ fontFamily: 'Poppins', marginTop: '65px' }}>
          Recent Posts
        </h1>
        <Divider></Divider>

        <Box mt={5}>
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default MyArticles;
