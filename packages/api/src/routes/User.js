import express from 'express'
import { PostController } from '../controllers/Post.js'
import { UserController } from '../controllers/User.js'
import { authentication } from '../middleware/Authentication.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

class UserRouter {
  checkRequests() {
    const UserObject = new UserController()
    const PostObject = new PostController()
    router.post('/refresh-access', UserObject.token)
    router.post('/forget-password', UserObject.forgetPassword)
    router.put('/reset-password', UserObject.resetPassword)
    router.put(
      '/:userId',
      authentication,
      upload.single('file'),
      UserObject.updateUserAvatar,
    )
    router.post('/signup', UserObject.signUp)
    router.post('/login', UserObject.logIn)
    router.delete('/logout', UserObject.logOut)
    router.get(
      '/:id/posts',
      authentication,
      PostObject.getCursorPostsOfSingleUser,
    )
    router.get('/:id/posts/search', authentication, PostObject.searchMyPost)
  }
}

const call = new UserRouter()
call.checkRequests()

export default router
