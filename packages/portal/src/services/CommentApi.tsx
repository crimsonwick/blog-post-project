import customAxios from '../auth/useAxios';
import {
  CommentInterface,
  AddCommentFunctionInterface,
  AddReplyInterface,
} from '../interface/App';

export const getCommentByPostId = async (
  id: string
): Promise<CommentInterface[]> => {
  return await customAxios.get(`/comments/${id}`);
};

export const addComment = async (
  object: AddCommentFunctionInterface
): Promise<CommentInterface> => {
  return await customAxios.post(`/comments`, object);
};

export const addReply = async (
  object: AddReplyInterface
): Promise<CommentInterface> => {
  return await customAxios.post(`/comments/addReply`, object);
};
