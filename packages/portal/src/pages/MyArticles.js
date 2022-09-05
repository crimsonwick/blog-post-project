import React from 'react';
import Navbar from '../components/NavBar';
import NavbarLoggedIn from '../components/NavbarLoggedIn';

function MyArticles() {
  let isLoggedIn = true;
  return (
    <div>
      {!isLoggedIn && <Navbar></Navbar>}
      {isLoggedIn && <NavbarLoggedIn></NavbarLoggedIn>}
      <div>MyArticles</div>
    </div>
  );
}

export default MyArticles;
