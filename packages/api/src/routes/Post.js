import express from 'express';
import {
  AddPost,
  getPosts,
  getRepliesfromOnePost,
  searchPosts,
} from '../controllers/Post.js';
import { Authentication } from '../middleware/Authentication.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../portal/src/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', Authentication, upload.single('file'), AddPost);

router.get('/search', searchPosts);
router.get('/:id/comments', getRepliesfromOnePost);
router.get('/', getPosts);


export default router;
