import model from '../models';
import { errorHandling } from '../middleware/Errors.js';

const { Comments, Users } = model;

export class CommentController {
  /**
   * Returns All Comments for a single post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static getRepliesfromOnePost = async (req, res) => {
    try {
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

  /**
   *Adds Comment on Post
   * @param {*} req
   * @param {*} res
   */
  static addComment = async (req, res) => {
    const { postId, userId, body } = req.body;
    try {
      const comment = await Comments.create({
        postId: postId,
        userId: userId,
        body: body,
      });
      res.json(comment);
    } catch (error) {
      errorHandling(res);
    }
  };

  /**
   *Returns All Comments alongwith User of the comment
   * @param {*} req
   * @param {*} res
   */
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

  /**
   *
   * @param {*} req
   * @param {*} res
   */
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

  /**
   *Adds Reply on a comment storing the parent ID of comment
   * @param {*} req
   * @param {*} res
   * @returns
   */
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

  /**
   *Returns Replies Of a Single Comment
   * @param {*} req
   * @param {*} res
   * @returns
   */
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
