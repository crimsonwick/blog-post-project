import React from "react";
import Navbar from "./Navbar";
import NavbarLoggedIn from "./NavbarLoggedIn";


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
