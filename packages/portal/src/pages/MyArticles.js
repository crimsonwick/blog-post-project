import { Container } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import Article from "../components/Article";
import { Box } from "@mui/system";
import Footer from "../components/Footer";
import { Divider } from "@mui/material";
import NavBar from "../components/NavBar";
import { AppContext } from "../App";
import { gettingPosts } from "../services/LoginApi.js";
const MyArticles = () => {
  const [data, setData] = useState([]);
  const { getAccessToken } = useContext(AppContext);

  useEffect(() => {
    const allPosts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      };
      const details = await gettingPosts(config);
      setData(details.data);
    };
    allPosts();
  }, [getAccessToken, setData]);
  return (
    <>
      <NavBar login={true} />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <h1 style={{ fontFamily: "Poppins", marginTop: "65px" }}>My Posts</h1>
        <Divider></Divider>
        <Box mt={5}>
          {data.map((object) => {
            return (
              <Article key={object._id} object={object} />
            )
          })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default MyArticles;