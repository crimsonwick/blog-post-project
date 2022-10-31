import express from 'express';
import { CommentController } from '../controllers/Comment.js';
const router = express.Router();

class CommentRouter {
  checkRequests() {
    // const CommentObject = new CommentController();
    router.get('/', CommentController.getComments);
    router.post('/', CommentController.addComment);
    router.get('/replies', CommentController.getRepliesfromComment);
    router.post('/addReply', CommentController.addReply);
    router.get('/:id/replies', CommentController.getRepliesfromOneComment);
  }
}

const call = new CommentRouter();
call.checkRequests();
export default router;
