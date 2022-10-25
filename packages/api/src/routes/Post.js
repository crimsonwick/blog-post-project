import express from 'express';
import { PostController } from '../controllers/Post.js';
import { Authentication } from '../middleware/Authentication.js';
import { upload } from '../utils/multer.js';

const router = express.Router();
class PostRouter {
  constructor() {}

  checkRequests() {
    const PostObject = new PostController();
    router.post('/', Authentication, upload.single('file'), PostObject.AddPost);
    router.get('/search', PostObject.searchPosts);
    router.get('/:id/comments', PostObject.getRepliesfromOnePost);
    router.get('/', PostObject.getPosts);
    router.get('/:id', PostObject.postDetail);
    // router.put('/:id/post/:pid', Authentication, PostObject.updatePosts);
    // router.delete('/:id/post/:pid', Authentication, PostObject.deletePosts);

    // router.get(
    //   '/:id/posts',
    //   Authentication,
    //   PostObject.getCursorPostsOfSingleUser
    // );
    // router.get('/:id/posts/search', Authentication, PostObject.searchMyPost);
  }
}

const call = new PostRouter();

call.checkRequests();

export default router;
