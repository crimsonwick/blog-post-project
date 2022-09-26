import express from 'express';
import { addComment, addReply, deleteComment, getCommentByPostId, getComments, getRepliesfromComment, updateComment } from '../controllers/Comment.js';
const router = express.Router();

router.get("/",getComments);
router.post("/",addComment); //    const { postId, userId,body } = req.body;
router.put("/:id",updateComment);
router.delete("/:id",deleteComment);
router.get("/replies",getRepliesfromComment);
router.post("/addReply",addReply);
router.get('/:id',getCommentByPostId);

export default router;