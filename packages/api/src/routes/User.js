import express from 'express';
import multer from 'multer';

import {
  SignUp,
  Login,
  token,
  Logout,
  UpdateUserAvatar,
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

router.put('/:userId', Authentication, upload.single('file'), UpdateUserAvatar);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/refreshAccess', token);
router.delete('/logout', Logout);

export default router;
