import express from 'express';
import multer from 'multer';
import { PostController } from '../controllers/Post.js';
import { UserController } from '../controllers/User.js';
import { Authentication } from '../middleware/Authentication.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../portal/src/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

class UserRouter{
  constructor(){

  }

  checkRequests(){
    const UserObject = new UserController();
    const PostObject = new PostController();
    router.get('/refresh-access', UserObject.token);
    router.post('/forget-password', UserObject.ForgetPassword);
    router.put('/reset-password', UserObject.ResetPassword);
    router.put('/:userId', Authentication, upload.single('file'), UserObject.UpdateUserAvatar);
    router.post('/signup', UserObject.SignUp);
    router.post('/login', UserObject.Login);
    router.delete('/logout', UserObject.Logout);
    router.put('/:id/post/:pid', Authentication, PostObject.updatePosts);
    router.delete('/:id/post/:pid', Authentication, PostObject.deletePosts);
    router.get('/:id/posts',Authentication,PostObject.myPosts);
    router.get('/:id/posts/search',Authentication,PostObject.searchMyPost);
  }
}

const call = new UserRouter();
call.checkRequests();

export default router;
