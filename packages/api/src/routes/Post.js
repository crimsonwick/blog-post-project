import express from "express";
import {
  AddPost,
  deletePosts,
  myPosts,
  searchPosts,
  updatePosts,
} from "../controllers/Post.js";
import { Authentication } from "../middleware/Authentication.js";

const router = express.Router();

router.post("/", Authentication, AddPost);
router.put("/:id/:pid", Authentication, updatePosts);
router.delete("/:id/:pid", Authentication, deletePosts);
router.get("/:title", searchPosts);

router.get("/", Authentication, myPosts);

export default router;
