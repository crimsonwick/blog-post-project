import express from "express";

import { SignUp, Login, token, Logout, ResetPassword, ForgetPassword } from "../controllers/User.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/refreshAccess", token);
router.delete("/logout", Logout);
router.put("/resetPassword/:token", ResetPassword)
router.post("/forgetPassword", ForgetPassword)

export default router;
