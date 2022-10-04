import express from 'express';
import { getPosts, searchMyPost, searchPosts } from '../controllers/Post.js';
import model from '../models';
import { PaginatedResults, getData } from '../middleware/Pagination.js';
import { Authentication } from '../middleware/Authentication.js';

const router = express.Router();
const { Posts } = model;

router.get('/all-posts', getPosts);
router.get('/paginated', PaginatedResults(Posts), getData);
router.get('/search', searchPosts);
router.get('/mypost/search',Authentication,searchMyPost)

export default router;
