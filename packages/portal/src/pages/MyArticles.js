import React from 'react';
import Navbar from '../components/NavBar';
import NavbarLoggedIn from '../components/NavbarLoggedIn';

const MyArticles = () => {
  let isLoggedIn = true;
  return (
    <div>
      {!isLoggedIn && <Navbar />}
      {isLoggedIn && <NavbarLoggedIn />}
      <div>MyArticles</div>
    </div>
  );
};

export default MyArticles;
