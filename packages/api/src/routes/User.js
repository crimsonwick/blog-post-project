import express from "express";

import { SignUp,Login,token,Logout } from "../controllers/User.js";

const router = express.Router();

router.post("/signup",SignUp);
router.post("/login",Login);
router.get("/refreshAccess",token);
router.delete("/logout",Logout);

export default router;
