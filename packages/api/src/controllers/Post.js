import model from '../models';
import client from '../config/elasticsearch.js';
import { ErrorHandling } from '../middleware/Errors.js';
const { Op } = require('sequelize');

const { Users, Posts, Comments } = model;

const query = async (qLimit, qId, qCondition, qAll) => {
  const limit = qLimit;
  let where = {};
  if (!qAll) {
    const id = qId;
    const condition = qCondition;
    if (condition === '') {
      where = { userId: id };
      console.log(where);
    } else {
      where = {
        [Op.and]: [{ createdAt: { [Op.gt]: condition } }, { userId: id }],
      };
      console.log(where);
    }
  } else {
    const condition = qCondition;
    if (condition === '') {
      where = {};
    } else {
      where = { createdAt: { [Op.gt]: condition } };
    }
  }

  const posts = await Posts.findAll({
    where: where,
    limit: limit + 1,
    order: [['createdAt', 'ASC']],
    include: [
      {
        model: Users,
        as: 'postedBy',
        attributes: ['email', 'avatar'],
      },
      {
        model: Comments,
        as: 'Comments',
      },
    ],
  });
  return posts;
};

export class PostController {
  /**
   * Add Post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  AddPost = async (req, res) => {
    const { userId, title, body, timeToRead } = req.body;
    try {
      const addNewPost = await Posts.create({
        userId: userId,
        title: title,
        body: body,
        image: req.file.originalname,
        timeToRead: timeToRead,
      });
      const readNewPost = await Posts.findOne({
        where: {
          id: addNewPost.id,
        },
        include: {
          model: Users,
          as: 'postedBy',
        },
      });
      const C_post = await client.index({
        index: 'posts',
        body: readNewPost,
      });
      return res.json(C_post);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Search Posts
   * @param {*} req
   * @param {*} res
   * @returns
   */
  searchPosts = async (req, res) => {
    let query = {
      index: 'posts',
      body: {
        query: {
          query_string: {
            query: req.query.title,
            default_field: '*',
          },
        },
      },
    };
    try {
      const postSearched = await client.search(query);
      const filteredPosts = postSearched.body.hits.hits.map((o) => o._source);
      return res.json(filteredPosts);
    } catch (error) {
      ErrorHandling(res);
    }
  };

  /**
   * Searching in user's MyArticles Page
   * @param {*} req
   * @param {*} res
   * @returns
   */
  searchMyPost = async (req, res) => {
    let query = {
      index: 'posts',
      body: {
        query: {
          match: { userId: req.params.id },
        },
      },
    };
    try {
      const LoginDetails = await Users.findAll({
        where: {
          email: req.user.user.email,
        },
      });
      if (!LoginDetails) return res.json(`Un Authorized Access`);
      else {
        const myPosts = await client.search(query);
        if (!myPosts) return res.json(`You haven't Posted Anything!!`);
        else {
          const filtered = myPosts.body.hits.hits.filter((o) =>
            o._source.title.includes(req.query.title)
          );
          return res.json(filtered);
        }
      }
    } catch (error) {
      ErrorHandling(res);
    }
  };

  /**
   * Returns Replies for a single post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getRepliesfromOnePost = async (req, res) => {
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
      ErrorHandling(res);
    }
  };
  /**
   * Gets Posts
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getPosts = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 4;
      const all = true;
      const id = 0;

      const cursorValues = {};
      cursorValues.next_page = req.query.next_page || '';
      cursorValues.prev_page = req.query.prev_page || '';

      let condition = '';
      if (cursorValues.next_page) condition = cursorValues.next_page;
      else if (cursorValues.prev_page) condition = cursorValues.prev_page;

      if (!condition) {
        const posts = await query(limit, id, condition, all);
        cursorValues.prev_page = null;
        if (posts[limit] === undefined) cursorValues.next_page = null;
        else {
          //*convert to plain js object
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.next_page = clonePost[limit - 1].createdAt;
        }
        if (posts.length == limit + 1) posts.pop();
        const result = [cursorValues, posts];
        res.send(result);
      } else if (condition === cursorValues.next_page) {
        const posts = await query(limit, id, condition, all);
        if (posts[limit] === undefined) cursorValues.next_page = null;
        else {
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.next_page = clonePost[limit - 1].createdAt;
        }
        if (posts[0] === undefined) cursorValues.prev_page = null;
        else {
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.prev_page = clonePost[0].createdAt;
        }
        if (posts.length == limit + 1) posts.pop();
        const result = [cursorValues, posts];
        res.send(result);
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: err.message });
    }
  };

  postDetail = async (req, res) => {
    const id = req.params.id;

    try {
      const post = await Posts.findOne({
        where: { id },
        include: [
          {
            model: Users,
            as: 'postedBy',
            attributes: ['email', 'avatar'],
          },
        ],
      });
      return res.status(200).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  };

  /**
   *  Get Cursor Posts of Single User
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCursorPostsOfSingleUser = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 4;
      const id = req.params.id;
      if (id) {
        let cursorValues = {};
        cursorValues.next_page = req.query.next_page || '';
        cursorValues.prev_page = req.query.prev_page || '';

        let condition = '';
        if (cursorValues.next_page) condition = cursorValues.next_page;
        else if (cursorValues.prev_page) condition = cursorValues.prev_page;

        if (!condition) {
          const posts = await query(limit, id, condition);
          cursorValues.prev_page = null;
          if (posts[limit] === undefined) cursorValues.next_page = null;
          else {
            //*convert to plain js object
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.next_page = clonePost[limit - 1].createdAt;
          }
          if (posts.length == limit + 1) posts.pop();
          const result = [cursorValues, posts];
          res.send(result);
        } else if (condition === cursorValues.next_page) {
          const posts = await query(limit, id, condition);
          if (posts[limit] === undefined) cursorValues.next_page = null;
          else {
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.next_page = clonePost[limit - 1].createdAt;
          }
          if (posts[0] === undefined) cursorValues.prev_page = null;
          else {
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.prev_page = clonePost[0].createdAt;
          }
          if (posts.length == limit + 1) posts.pop();
          const result = [cursorValues, posts];
          res.send(result);
        }
      } else {
        return res.status(404).json('User not found');
      }
    } catch (err) {
      return res.json({ error: err.message });
    }
  };
}
