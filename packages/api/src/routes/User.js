import express from 'express';
import multer from 'multer';
import { PostController } from '../controllers/Post.js';
import { UserController } from '../controllers/User.js';
import { Authentication } from '../middleware/Authentication.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

class UserRouter {
  constructor() {}

  checkRequests() {
    const UserObject = new UserController();
    const PostObject = new PostController();
    router.post('/refresh-access', UserObject.token);
    router.post('/forget-password', UserObject.ForgetPassword);
    router.put('/reset-password', UserObject.ResetPassword);
    router.put(
      '/:userId',
      Authentication,
      upload.single('file'),
      UserObject.UpdateUserAvatar
    );
    router.post('/signup', UserObject.SignUp);
    router.post('/login', UserObject.Login);
    router.delete('/logout', UserObject.Logout);
    router.put('/:id/post/:pid', Authentication, PostObject.updatePosts);
    router.delete('/:id/post/:pid', Authentication, PostObject.deletePosts);
    router.get(
      '/:id/posts',
      Authentication,
      PostObject.getCursorPostsOfSingleUser
    );
    router.get('/:id/posts/search', Authentication, PostObject.searchMyPost);
  }
}

const call = new UserRouter();
call.checkRequests();

export default router;
