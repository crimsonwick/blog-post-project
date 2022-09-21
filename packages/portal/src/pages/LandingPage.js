import React from 'react';
import NavBarX from '../components/NavBarX';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <>
      <NavBarX login={true} />
      
      <Container sx={{ marginY: 5 }}></Container>
      <div>Hi</div>
    </>
  );
};

export default Home;
