import express from 'express';
import multer from 'multer';
import { deletePosts, myPosts, searchMyPost, updatePosts } from '../controllers/Post.js';

import {
  SignUp,
  Login,
  token,
  Logout,
  UpdateUserAvatar,
  ResetPassword,
  ForgetPassword,
} from '../controllers/User.js';
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

router.get('/refresh-access', token);
router.post('/forget-password', ForgetPassword);
router.put('/reset-password', ResetPassword);
router.put('/:userId', Authentication, upload.single('file'), UpdateUserAvatar);
router.post('/signup', SignUp);
router.post('/login', Login);
router.delete('/logout', Logout);
router.put('/:id/post/:pid', Authentication, updatePosts);
router.delete('/:id/post/:pid', Authentication, deletePosts);
router.get('/:id/posts',Authentication,myPosts);
router.get('/:id/posts/search',Authentication,searchMyPost);

export default router;
