import express from 'express';
import {
  addComment,
  addReply,
  deleteComment,
  getComments,
  getRepliesfromComment,
  getRepliesfromOneComment,
  updateComment,
} from '../controllers/Comment.js';
const router = express.Router();

router.get('/', getComments);
router.post('/', addComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.get('/replies', getRepliesfromComment);
router.post('/addReply', addReply);
router.get("/reply/:id",getRepliesfromOneComment);

export default router;
