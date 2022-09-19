import { Container } from "@mui/system";
import React, { useEffect,useState,useContext } from "react";
// import NavBar from "../components/NavBar";
import Article from "../components/Article";
import { Box } from "@mui/system";
import Footer from "../components/Footer";
import { Divider } from "@mui/material";
import NavBarX from "../components/NavBarX";
import { AppContext } from "../App";
import { gettingPosts } from "../services/LoginApi";

const MyArticles = () => {
    
const [data,setData] = useState([]);
const { getAccessToken } = useContext(AppContext)

const allPosts = async() => {
  const config = {headers: {
    "Authorization" : `Bearer ${getAccessToken}`
  }
}
  const details = await gettingPosts(config);
  setData(details.data)
}

useEffect(() => {
  allPosts();
},[]);

  return (
    <>
      <NavBarX login = {true}></NavBarX>
      <button onClick={() => alert(JSON.stringify(data))}>Click me</button>
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <h1 style={{fontFamily:"Poppins", marginTop: "65px"}}>Recent Posts</h1>
        <Divider></Divider>

        <Box mt={5}>
          {data.map((object) => {
            return(
              <Article object={object}/>
            )
          })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default MyArticles;
