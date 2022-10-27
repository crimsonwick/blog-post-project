import model from '../models';
import { ErrorHandling } from '../middleware/Errors.js';

const { Comments, Users } = model;

export class CommentController {
  //static ->?
  addComment = async (req, res) => {
    const { postId, userId, body } = req.body;
    try {
      const addUserComment = await Comments.create({
        postId: postId,
        userId: userId,
        body: body,
      });
      res.json(addUserComment);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  getComments = async (req, res) => {
    try {
      const getAllComments = await Comments.findAll({
        include: {
          model: Users,
          as: 'commentedBy',
        },
      });
      res.json(getAllComments);
    } catch (error) {
      ErrorHandling(res);
    }
  };
  getRepliesfromComment = async (req, res) => {
    try {
      const replies = await Comments.findAll({
        include: {
          model: Comments,
          as: 'Replies',
        },
      });
      res.json(replies);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  addReply = async (req, res) => {
    const { userId, postId, parentId, body } = req.body;
    try {
      const addReply = await Comments.create({
        userId: userId,
        postId: postId,
        parentId: parentId,
        body: body,
      });
      return res.json(addReply);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  getRepliesfromOneComment = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await Comments.findAll({
        where: {
          parentId: id,
        },
        include: {
          model: Users,
          as: 'commentedBy',
        },
      });
      return res.json(response);
    } catch (error) {
      ErrorHandling(res);
    }
  };
}
