import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AppContext } from '../App';
import { addComment, addReply } from '../services/CommentApi';
import InputButton from './InputButton';
import InputField from './InputField';

const AddComment = (props) => {
  // const inputRef = useRef(null);
  const schema = yup.object().shape({
    comment: yup.string().required(),
  });
  const methods = useForm({
    defaultValues: { comment: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control, setValue } = methods;
  const { userData, accessToken } = useContext(AppContext);

  const onSubmit = async (data) => {
    setValue('comment', '');
    if (accessToken && props.Comment) {
      await addComment({
        postId: props.object.id,
        userId: userData.id,
        body: data.comment,
      });
      props.refreshComment(props.object.id);
    }
    if (accessToken && !props.Comment) {
      await addReply({
        userId: userData.id,
        postId: props.object.postId,
        parentId: props.object.id,
        body: data.comment,
      });
      props.refreshReplies(props.object.id);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={2} alignItems="flex-end">
          <InputField
            name={'comment'}
            control={control}
            width={props.width}
            labelAbove={props.labelAbove}
            placeholder={props.placeholder}
          />
          <Box
            sx={{ display: 'flex', allignItems: 'centre', marginTop: '5px' }}
            display="flex"
          >
            <InputButton name="Post" width="100px" />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default AddComment;
