import express from 'express';
import { getPosts, searching, searchPosts } from '../controllers/Post.js';
import model from '../models';
import { PaginatedResults, getData } from '../middleware/Pagination.js';



const router = express.Router();
const { Posts } = model;

router.get("/allPosts", getPosts);
router.get("/paginated", PaginatedResults(Posts), getData);
router.get("/search", searchPosts);

export default router;