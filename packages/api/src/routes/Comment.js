import express from 'express';
import {
  addComment,
  addReply,
  deleteComment,
  getCommentByPostId,
  getComments,
  getRepliesfromComment,
  updateComment,
} from '../controllers/Comment.js';
const router = express.Router();

router.get('/', getComments);
router.post('/', addComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.get('/replies', getRepliesfromComment);
router.post('/add-reply', addReply);

export default router;
