import express from 'express';
import { CommentController } from '../controllers/Comment.js';
import { PostController } from '../controllers/Post.js';
import { authentication } from '../middleware/Authentication.js';
import { getData, PaginatedComments } from '../middleware/Pagination.js';
import model from '../models';
import { upload } from '../utils/multer.js';

const router = express.Router();
const { Users, Comments } = model;
class PostRouter {
  checkRequests() {
    router.post(
      '/',
      authentication,
      upload.single('file'),
      PostController.addPost
    );
    router.get('/search', PostController.searchPosts);
    router.get('/:id/comments', CommentController.getRepliesfromOnePost);
    router.get('/', PostController.getPosts);
    router.get(
      '/:id',
      authentication,
      PostController.getCursorPostsOfSingleUser
    );
    router.get(
      '/:id/comments/fetch-comments',
      PaginatedComments(Comments, Users, 'commentedBy'),
      getData
    );
  }
}

const call = new PostRouter();

call.checkRequests();

export default router;
