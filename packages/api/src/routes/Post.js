import express from 'express';
import { PostController } from '../controllers/Post.js';
import { authentication } from '../middleware/Authentication.js';
import { upload } from '../utils/multer.js';

const router = express.Router();
class PostRouter {
  checkRequests() {
    router.post('/', authentication, upload.single('file'), PostController.addPost);
    router.get('/search', PostController.searchPosts);
    router.get('/:id/comments', PostController.getRepliesfromOnePost);
    router.get('/', PostController.getPosts);
    router.get('/:id', authentication, PostController.getCursorPostsOfSingleUser);
  }
}

const call = new PostRouter();

call.checkRequests();

export default router;
