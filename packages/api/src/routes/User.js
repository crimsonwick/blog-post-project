import express from "express";
import { PostController } from "../controllers/Post.js";
import { UserController } from "../controllers/User.js";
import { authentication } from "../middleware/Authentication.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

class UserRouter {
  checkRequests() {
    router.post("/refresh-access", UserController.token);
    router.post("/forget-password", UserController.forgetPassword);
    router.put("/reset-password", UserController.resetPassword);
    router.put(
      "/:userId",
      authentication,
      upload.single("file"),
      UserController.updateUserAvatar
    );
    router.post("/signup", UserController.signUp);
    router.post("/login", UserController.logIn);
    router.delete("/logout", UserController.logOut);
    router.get(
      "/:id/posts",
      authentication,
      PostController.getCursorPostsOfSingleUser
    );
    router.get(
      "/:id/posts/search",
      authentication,
      PostController.searchMyPost
    );
  }
}

const call = new UserRouter();
call.checkRequests();

export default router;
