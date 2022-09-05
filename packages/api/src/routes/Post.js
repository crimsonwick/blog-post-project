import express from 'express';
import { Authentication } from '../auth/Authenticate.js';
import { AddPost, deletePosts, getPosts, updatePosts } from '../controllers/Post.js';

const router = express.Router();

router.post("/",Authentication,AddPost);
router.get("/",getPosts);
router.put("/:id",updatePosts);
router.delete("/:id",deletePosts);

export default router;