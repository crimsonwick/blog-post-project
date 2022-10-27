import express from 'express';
import { PostController } from '../controllers/Post.js';
import Comment from '../models/comments';
import { Authentication } from '../middleware/Authentication.js';
import { upload } from '../utils/multer.js';
import { paginatedResults } from '../middleware/Pagination';

const router = express.Router();
class PostRouter {
  checkRequests() {
    const PostObject = new PostController();
    router.post('/', Authentication, upload.single('file'), PostObject.AddPost);
    router.get('/search', PostObject.searchPosts);
    router.get(
      '/:id/comments',
      paginatedResults(Comment),
      PostObject.getRepliesfromOnePost
    );
    router.get('/', PostObject.getPosts);
    router.get('/:id', PostObject.postDetail);
  }
}

const call = new PostRouter();

call.checkRequests();

export default router;
