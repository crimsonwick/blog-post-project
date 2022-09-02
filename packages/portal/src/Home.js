import React from "react";
import Navbar from "./Navbar";
import NavbarLoggedIn from "./NavbarLoggedIn";

function Home() {
  
    let isLoggedIn = true;
  return (
    <div>
      {!isLoggedIn && <Navbar></Navbar>}
      {isLoggedIn && <NavbarLoggedIn></NavbarLoggedIn>}
      <div>Home</div>
    </div>
  );
}

export default Home;
