import React from 'react';
import Navbar from './Navbar';
import NavbarLoggedIn from './NavbarLoggedIn';
import Container from '@mui/material/Container';

function Home() {
  let isLoggedIn = true;
  return (
    <div>
      <Container>
        <div>Home</div>
        {!isLoggedIn && <Navbar></Navbar>}
        {isLoggedIn && <NavbarLoggedIn></NavbarLoggedIn>}
      </Container>
    </div>
  );
}

export default Home;
