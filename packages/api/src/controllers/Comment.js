import model from '../models';
import { ErrorHandling } from '../middleware/Errors.js';

const { Comments, Users } = model;

export class CommentController {
  constructor() {}
  addComment = async (req, res) => {
    const { postId, userId, body } = req.body;
    try {
      const addC = await Comments.create({
        postId: postId,
        userId: userId,
        body: body,
      });
      res.json(addC);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  getComments = async (req, res) => {
    try {
      const getAll = await Comments.findAll({
        include: {
          model: Users,
          as: 'commentedBy',
        },
      });
      res.json(getAll);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  updateComment = async (req, res) => {
    const update = { ...req.body };
    const { id } = req.params;
    try {
      const updateC = await Comments.update(update, { where: { id: id } });
      res.json(`Successfully Updated Id = ${id}`);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteC = await Comments.destroy({ where: { id: id } });
      res.json(`Successfully Deleted Id = ${id}`);
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
