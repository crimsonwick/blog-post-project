import React from 'react';
import NavBar from '../components/NavBar';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ marginY: 5 }}></Container>
      <div>Hi</div>
    </>
  );
};

export default Home;
