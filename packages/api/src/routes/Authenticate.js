import express from 'express';
import { Authentication, deletePost, getPost, getUsers, myPosts } from '../auth/Authenticate.js';

const router  = express.Router();

router.get("/",Authentication , getPost);
router.delete("/:id",Authentication, deletePost);
router.get("/allUsers",getUsers);
router.get("/myposts",Authentication,myPosts);

export default router;