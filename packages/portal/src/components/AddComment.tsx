import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AppContext } from '../context/AppContext';
import { AddCommentInterface, AppContextInterface } from '../interface/App';
import { addComment, addReply } from '../services/CommentApi';
import { InputButton } from './InputButton';
import { InputField } from './InputField';

/**
 * Add Comment
 * @param props
 * @returns
 */
export const AddComment = (props: AddCommentInterface) => {
  const schema = yup.object().shape({
    comment: yup.string().required(),
  });
  const methods = useForm({
    defaultValues: { comment: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control, setValue } = methods;
  const context: AppContextInterface | null = useContext(AppContext);

  /**
   * Onsubmit Function
   * @param data
   */
  const onSubmit = async (data: { comment: string }) => {
    setValue('comment', '');
    if (context?.accessToken && props.Comment && props.articleId) {
      await addComment({
        postId: props.articleId,
        userId: context.userData.id,
        body: data.comment,
      });
      if (props.refreshComment) {
        props.refreshComment(props.articleId);
      }
    }
    if (context?.accessToken && !props.Comment && props.commentObject) {
      await addReply({
        userId: context.userData.id,
        postId: props.commentObject.postId,
        parentId: props.commentObject.id,
        body: data.comment,
      });
      if (props.refreshReplies) props.refreshReplies(props.commentObject.id);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {context?.loggedIn && (
          <Box display='flex' gap={2} alignItems='flex-end'>
            <InputField
              name={'comment'}
              control={control}
              width={props.width}
              labelAbove={props.labelAbove}
              placeholder={props.placeholder}
            />
            <Box
              sx={{ display: 'flex', allignItems: 'centre', marginTop: '5px' }}
              display='flex'
            >
              <InputButton name='Post' width='100px' />
            </Box>
          </Box>
        )}
      </form>
    </FormProvider>
  );
};
