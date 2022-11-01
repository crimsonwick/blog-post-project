import model from '../models';
import { errorHandling } from '../middleware/Errors.js';

const { Comments, Users } = model;

export class CommentController {
  /**
   * Returns Replies for a single post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static getRepliesfromOnePost = async (req, res) => {
    try {
      //TODO:applying limit offset pagination 3 comments at a
      const AllComments = await Comments.findAll({
        where: {
          postId: req.params.id,
          parentId: null,
        },
        include: {
          model: Users,
          as: 'commentedBy',
        },
      });
      return res.json(AllComments);
    } catch (error) {
      errorHandling(res);
    }
  };

  static addComment = async (req, res) => {
    const { postId, userId, body } = req.body;
    try {
      const addC = await Comments.create({
        postId: postId,
        userId: userId,
        body: body,
      });
      res.json(addC);
    } catch (error) {
      errorHandling(res);
    }
  };

  static getComments = async (req, res) => {
    try {
      const getAll = await Comments.findAll({
        include: {
          model: Users,
          as: 'commentedBy',
        },
      });
      res.json(getAll);
    } catch (error) {
      errorHandling(res);
    }
  };
  static getRepliesfromComment = async (req, res) => {
    try {
      const replies = await Comments.findAll({
        include: {
          model: Comments,
          as: 'Replies',
        },
      });
      res.json(replies);
    } catch (error) {
      errorHandling(res);
    }
  };

  static addReply = async (req, res) => {
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
      errorHandling(res);
    }
  };

  static getRepliesfromOneComment = async (req, res) => {
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
      errorHandling(res);
    }
  };
}
