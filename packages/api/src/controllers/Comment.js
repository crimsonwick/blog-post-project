import model from '../models'
import { errorHandling } from '../middleware/Errors.js'

const { Comments, Users } = model

export class CommentController {

  addComment = async (req, res) => {
    const { postId, userId, body } = req.body
    try {
      const addComment = await Comments.create({
        postId: postId,
        userId: userId,
        body: body,
      })
      res.json(addComment)
    } catch (error) {
      errorHandling(res)
    }
  }

  getComments = async (req, res) => {
    try {
      const getAllComments = await Comments.findAll({
        include: {
          model: Users,
          as: 'Commented_By',
        },
      })
      res.json(getAllComments)
    } catch (error) {
      errorHandling(res)
    }
  }

  updateComment = async (req, res) => {
    const update = { ...req.body }
    const { id } = req.params
    try {
      await Comments.update(update, { where: { id: id } })
      res.json(`Successfully Updated Id = ${id}`)
    } catch (error) {
      errorHandling(res)
    }
  }

  deleteComment = async (req, res) => {
    const { id } = req.params
    try {
      cawait Comments.destroy({ where: { id: id } })
      res.json(`Successfully Deleted Id = ${id}`)
    } catch (error) {
      errorHandling(res)
    }
  }
  getRepliesfromComment = async (req, res) => {
    try {
      const replies = await Comments.findAll({
        include: {
          model: Comments,
          as: 'Replies',
        },
      })
      res.json(replies)
    } catch (error) {
      errorHandling(res)
    }
  }

  addReply = async (req, res) => {
    const { userId, postId, parentId, body } = req.body
    try {
      const addReply = await Comments.create({
        userId: userId,
        postId: postId,
        parentId: parentId,
        body: body,
      })
      return res.json(addReply)
    } catch (error) {
      errorHandling(res)
    }
  }

  getRepliesfromOneComment = async (req, res) => {
    const { id } = req.params
    try {
      const response = await Comments.findAll({
        where: {
          parentId: id,
        },
        include: {
          model: Users,
          as: 'Commented_By',
        },
      })
      return res.json(response)
    } catch (error) {
      errorHandling(res)
    }
  }
}
