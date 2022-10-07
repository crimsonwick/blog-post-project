import { Container } from "@mui/system";
import React from "react";
import ArticleCard from "../components/ArticleCard";
import { Box } from "@mui/system";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect, useContext } from "react";
import { gettingPosts, parseJwt } from "../services/LoginApi";
import { AppContext } from "../App";
import { PostsHeader } from '../components/PostsHeader';

const MyArticles = () => {
  const [data, setData] = useState([]);
  const { accessToken,searchMyData } = useContext(AppContext);

  useEffect(() => {
    const allPosts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const userDetails = parseJwt(accessToken);
      const details = await gettingPosts(config, userDetails.user.id);
      if (details.data.length) setData(details.data);
    };
    allPosts();
  }, [accessToken, setData]);
  return (
    <>
      <NavBar login={true} mainPage={false}/>
      <Container sx={{ marginY: 10 }}>
        <PostsHeader name="My Articles" />
        <Box mt={5}>
        {data && searchMyData.length === 0
            ? data.map((object) => {
                return <ArticleCard key={object._source.id} object={object._source} />;
              })
            : searchMyData.map((object) => {
                return (
                  <ArticleCard
                    key={object._source.id}
                    object={object._source}
                  />
                );
              })}
        </Box>
        <Footer />
      </Container>
    </>
  );
};
export default MyArticles;
