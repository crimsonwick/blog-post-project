import express from 'express'
import { PostController } from '../controllers/Post.js'
import { authentication } from '../middleware/Authentication.js'
import { upload } from '../utils/multer.js'

const router = express.Router()
class PostRouter {
  constructor() {}

  checkRequests() {
    const PostObject = new PostController()
    router.post('/', authentication, upload.single('file'), PostObject.AddPost)
    router.get('/search', PostObject.searchPosts)
    router.get('/:id/comments', PostObject.getRepliesfromOnePost)
    router.get('/', PostObject.getPosts)
    router.get('/:id', authentication, PostObject.getCursorPostsOfSingleUser)
  }
}

const call = new PostRouter()

call.checkRequests()

export default router
