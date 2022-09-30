import express from 'express';
import multer from 'multer';

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

export default router;
