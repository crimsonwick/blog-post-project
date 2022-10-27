import express from 'express'
import { CommentController } from '../controllers/Comment.js'
const router = express.Router()

class CommentRouter {
  checkRequests() {
    const CommentObject = new CommentController()
    router.get('/', CommentObject.getComments)
    router.post('/', CommentObject.addComment)
    router.put('/:id', CommentObject.updateComment)
    router.delete('/:id', CommentObject.deleteComment)
    router.get('/replies', CommentObject.getRepliesfromComment)
    router.post('/addReply', CommentObject.addReply)
    router.get('/:id/replies', CommentObject.getRepliesfromOneComment)
  }
}

const call = new CommentRouter()
call.checkRequests()
export default router
