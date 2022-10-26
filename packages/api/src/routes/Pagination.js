import express from 'express';
import { PostController } from '../controllers/Post.js';

const router = express.Router();

class PaginationRouter {
  constructor() {}

  checkRequests() {
    const PostObject = new PostController();
    router.get('/', PostObject.PaginatedPosts);
  }
}

const call = new PaginationRouter();
call.checkRequests();

export default router;
