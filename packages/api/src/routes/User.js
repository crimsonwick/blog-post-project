import express from "express";

import {
  postUser,
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
  authenticateUser,
  //getPaginateUser,
  //getCursorPaginateUser,
  searchUser,
} from "../controllers/User.js";

const router = express.Router();

router.post("/register", postUser);
router.get("/get", getUser);
//router.get("/getpaginatedOffsetUser", getPaginateUser);
//router.get("/getpaginatedCursorUser", getCursorPaginateUser);

router.get("/get/:id", getOneUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/authenticate", authenticateUser);
router.post("/login", authenticateUser);
router.get("/searchUser", searchUser);

export default router;
