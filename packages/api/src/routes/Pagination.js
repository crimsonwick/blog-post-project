import express from 'express';
import { getData, PaginatedResults } from '../middleware/Pagination.js';
import model from '../models';

const { Posts } = model;
const router = express.Router();
router.get("/post", PaginatedResults(Posts),getData);

export default router;