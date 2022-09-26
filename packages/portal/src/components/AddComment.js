import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Box } from "@mui/material";
import InputButton from "./InputButton";
import { AppContext } from "../App";
import { parseJwt } from "../services/LoginApi";
import { addComment } from "../services/CommentApi";

const AddComment = (props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: { comment: "" },
  });
  const { getAccessToken } = useContext(AppContext);

  const onSubmit = async (data) => {
    // console.log(data , props.postId);
    if (getAccessToken) {
      const LoggedInUserInfo = parseJwt(getAccessToken);
      console.log(LoggedInUserInfo.user.id);

      await addComment({
        postId: props.postId,
        userId: LoggedInUserInfo.user.id,
        body: data.comment,
      });
      props.refreshComments();
    }
  };
  return (
    <Box display="flex" gap={2} alignItems="flex-end">
      <Box>
        <InputField
          name="comment"
          control={control}
          width="1000px"
          labelAbove="Add Comment"
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", allignItems: "centre", marginTop: "5px" }}
      >
        <InputButton name="Post" width="100px" />
      </Box>
    </Box>
  );
};

export default AddComment;
