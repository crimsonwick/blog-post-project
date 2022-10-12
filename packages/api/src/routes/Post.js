import express from 'express';
import {
  AddPost,
  deletePosts,
  getPosts,
  getRepliesfromOnePost,
  myPosts,
  searchPosts,
  updatePosts,
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

router.get('/', getPosts);
router.post('/', Authentication, upload.single('file'), AddPost);
router.put('/:id/:pid', Authentication, updatePosts);
router.delete('/:id/:pid', Authentication, deletePosts);
router.get('/:id', searchPosts);
router.get('/comments/:id', getRepliesfromOnePost);
router.get('/', Authentication, myPosts);

export default router;
