import { Container } from "@mui/system";
import React from "react";
import Comment from "../components/Comment";
import { Box } from "@mui/material";
import AddComment from "../components/AddComment";
import ArticleBig from "../components/ArticleBig";
import { useLocation } from "react-router-dom";
import { getCommentByPostId } from "../services/CommentApi";
import { useEffect, useState } from "react";

const ArticleDetail = () => {
  const location = useLocation();

  const [data, setData] = useState([]);

  const allComments = async () => {
    const details = await getCommentByPostId(location.state.object.id);

    // console.log(details.data);
    setData(details.data);
  };

  useEffect(() => {
    allComments();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <button onClick={() => alert(JSON.stringify(location.state.object))}>
          Click ME!
        </button>
        <button onClick={() => alert(JSON.stringify(data))}>Click ME 2</button>

        <Box mb={5}>
          <ArticleBig />
        </Box>
        <Box>
          <AddComment postId={location.state.object.id} refreshComments={allComments}/>
        </Box>
        <Box mt={3}>
          {/* <Comment count={4} object={location.state.object}/> */}
          {data.map((object) => {
            return <Comment key={object._id} count={4} object={object} />;
          })}
        </Box>
      </Container>
    </>
  );
};
export default ArticleDetail;
