import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import { Box } from '@mui/material';
import InputButton from './InputButton';
import { AppContext } from '../App';
import { addComment, addReply } from '../services/CommentApi';

const AddComment = (props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: { comment: '' },
  });
  const { userData,accessToken } = useContext(AppContext);

  const onSubmit = async (data) => {
    if (accessToken && props.Comment) {
      await addComment({
        postId: props.object.id,
        userId: userData.id,
        body: data.comment,
      });
        props.refreshComment();
    }
    if(accessToken && !(props.Comment)){
      await addReply({
        userId: userData.id,
        postId: props.object.postId,
        parentId: props.object.id,
        body: data.comment
      });
        props.refreshReplies(props.object.id)
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
        sx={{ display: 'flex', allignItems: 'centre', marginTop: '5px' }}
      >
        <InputButton name="Post" width="100px" />
      </Box>
    </Box>
  );
};

export default AddComment;
