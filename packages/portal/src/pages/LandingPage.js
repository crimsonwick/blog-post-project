import React from 'react';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <>
      <Navbar login={true} />
      
      <Container sx={{ marginY: 5 }}></Container>
      <div>Hi</div>
    </>
  );
};

export default Home;
