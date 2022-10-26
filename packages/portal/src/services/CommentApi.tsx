import axios from 'axios';

const baseURL: string = 'http://localhost:5000';

export interface CommentInterface {
  id: string;
  postId: string;
  userId: string;
  parentId?: string | null;
  body: string;
  createdAt: string;
  updatedAt: string;
  commentedBy?: {
    id: string;
    email: string;
    password: string;
    avatar: string;
    resetLink: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AddCommentFunctionInterface {
  postId?: string;
  userId?: string;
  body: string;
}

export interface AddReplyInterface extends AddCommentFunctionInterface {
  parentId: string;
}
export const getCommentByPostId = async (
  id: string
): Promise<CommentInterface[]> => {
  return await axios.get(`${baseURL}/comments/${id}`);
};

export const addComment = async (
  object: AddCommentFunctionInterface
): Promise<CommentInterface> => {
  return await axios.post(`${baseURL}/comments`, object);
};

export const addReply = async (
  object: AddReplyInterface
): Promise<CommentInterface> => {
  return await axios.post(`${baseURL}/comments/addReply`, object);
};
