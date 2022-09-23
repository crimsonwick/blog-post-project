import express from 'express';

import {
  SignUp,
  Login,
  token,
  Logout,
  UpdateUserAvatar,
} from '../controllers/User.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/refreshAccess', token);
router.delete('/logout', Logout);
router.put('/user/:userId', UpdateUserAvatar);

export default router;
