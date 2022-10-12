import express from 'express';
import { PaginatedPosts } from '../controllers/Post.js';

const router = express.Router();

router.get('/', PaginatedPosts);

export default router;
