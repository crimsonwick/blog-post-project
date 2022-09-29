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
  const { searchData } = useContext(AppContext)

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
        <h1 style={{ fontFamily: "Poppins", marginTop: "170px" }}>My Posts</h1>
        <Divider></Divider>
        <Box mt={5}>

          {(data && searchData.length === 0) ? ((data.map((object) => {
            return (
              <Article key={object.id} object={object} />
            )
          }))
          ) : (searchData.map((object) => {
            return (
              <Article key={object._source.id} object={object._source} />
            )
          }))}

          {/* {data.map((object) => {
            return (
              <Article key={object._id} object={object} />
            )
          })} */}
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default MyArticles;