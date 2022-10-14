import model from '../models';
import client from '../config/elasticsearch.js';
import { ErrorHandling } from '../middleware/Errors.js';
const { Op } = require('sequelize');

const { Users, Posts, Comments } = model;

export class PostController{
  constructor(){

  }

     AddPost = async (req, res) => {
    const { userId, title, body, timetoRead } = req.body;
    try {
      const addNewPost = await Posts.create({
        userId: userId,
        title: title,
        body: body,
        image: req.file.originalname,
        timetoRead: timetoRead
      });
      const readNewPost = await Posts.findOne({
        where: {
          id: addNewPost.id
        },
        include: {
          model: Users,
          as: 'Posted_By'
        }
      })
      const C_post = await client.index({
        index: "posts",
        body: readNewPost,
      });
      return res.json(C_post);
    } catch (error) {
      console.log(error)
    }
  }
  
  //    getPosts = async (req, res) => {
  //   try {
  //     const getAll = await client.search({
  //       index: 'posts',
  //     })
  //     const posts = getAll.body.hits.hits.map((s) => s._source);
  //     return res.json(posts);
  //   } catch (error) {
  //     ErrorHandling(res);
  //   }
  // }
  
     updatePosts = async (req, res) => {
    const { id, pid } = req.params;
    try {
      const updatePost = await Posts.update({ ...req.body }, {
        where: {
          id: id
        }
      });
      const update = await Posts.findOne({
        where: {
          id: id
        }
      });
      const newValues = Object.assign(update, { ...req.body })
      const U_post = await client.update({
        index: "posts",
        id: pid,
        body: {
          doc: newValues
        }
      })
      return res.json(`Updated Successfully Id = ${id}`);
    } catch (error) {
      ErrorHandling(res);
    }
  }
  
     deletePosts = async (req, res) => {
    try {
      const { id, pid } = req.params;
      const deletePosts = await Posts.destroy({ where: { id: id } });
      const D_posts = await client.delete({
        index: "posts",
        id: pid
      });
      return res.json(`Successfully Deleted Id = ${id}`);
    } catch (error) {
      ErrorHandling(res);
    }
  }
  
     searchPosts = async (req, res) => {
    let query = {
      index: "posts",
      body: {
        query: {
          query_string: {
            query: req.query.title,
            default_field: "*",
          },
        },
      }
    };
    try {
      const C_post = await client.search(query);
      return res.json(C_post.body.hits.hits);
    } catch (error) {
      ErrorHandling(res);
    }
  }
  
     myPosts = async (req, res) => {
    let query = {
      index: "posts",
      body: {
          query: {
              match: {"userId": req.user.user.id}
          }
      }
    };
    try {
      const LoginDetails = await Users.findAll({
        where: {
          email: req.user.user.email
        }
      })
      if (!LoginDetails) return res.json(`Un Authorized Access`)
      else {
        const myPosts = await client.search(query);
        if (!myPosts) return res.json(`You haven't Posted Anything!!`);
        else return res.json(myPosts.body.hits.hits);
      }
    } catch (error) {
      ErrorHandling(res);
    }
  }
  
     searchMyPost = async(req,res) => {
    let query = {
      index: "posts",
      body: {
          query: {
              match: {"userId": req.user.user.id}
          }
      }
    };
    try {
      const LoginDetails = await Users.findAll({
        where: {
          email: req.user.user.email
        }
      })
      if (!LoginDetails) return res.json(`Un Authorized Access`)
      else {
        const myPosts = await client.search(query);
        if (!myPosts) return res.json(`You haven't Posted Anything!!`);
        else{
          const filtered = myPosts.body.hits.hits.filter((o) => o._source.title.includes(req.query.title))
          return res.json(filtered)
        }
      }
    } catch (error) {
      ErrorHandling(res);
    }
  }
  
  
     getRepliesfromOnePost = async(req,res) => {
    try {
        const AllComments = await Comments.findAll({
            where: {
                postId: req.params.id,
                parentId: null
            },
              include: {
                  model: Users,
                  as: 'Commented_By'
              }
        })
    return res.json(AllComments)
    } catch (error) {
        ErrorHandling(res)
    }
  }
  
     PaginatedPosts = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    try {
      const getAll = await client.search({
        index: 'posts'
      });
      const getAllP= await client.search({
        index: 'posts',
        from: (page-1)*limit,
        size: limit
      })
      const totalPages = Math.ceil((getAll.length)/(limit));
      const posts = getAllP.body.hits.hits.map((s) => s._source);
      return res.json({Posts: posts,datalength: posts.length,totalPosts: (getAll.body.hits.hits.map((s) => s._source).length),totalPages: totalPages});
    } catch (error) {
      ErrorHandling(res);
    } 
  }
  getPosts = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      if (isNaN(limit)) {
        const allPosts = await Posts.findAll({
          include: [
            {
              model: Users,
              as: 'Posted_By',
              attributes: ['email', 'avatar'],
            },
            {
              model: Comments,
              as: 'Comments',
            },
          ],
        });
        return res.json(allPosts);
      }
  
      const cursorValues = {};
      cursorValues.next_page = req.query.next_page || '';
      cursorValues.prev_page = req.query.prev_page || '';
  
      let condition = '';
      if (cursorValues.next_page) condition = cursorValues.next_page;
      else if (cursorValues.prev_page) condition = cursorValues.prev_page;
  
      if (!condition) {
        const posts = await Posts.findAll({
          limit: limit + 1,
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: Users,
              as: 'Posted_By',
              attributes: ['email', 'avatar'],
            },
            {
              model: Comments,
              as: 'Comments',
            },
          ],
        });
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
        const posts = await Posts.findAll({
          limit: limit + 1,
          where: { createdAt: { [Op.gt]: condition } },
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: Users,
              as: 'Posted_By',
              attributes: ['email', 'avatar'],
            },
            {
              model: Comments,
              as: 'Comments',
            },
          ],
        });
        //*next page link
        if (posts[limit] === undefined) cursorValues.next_page = null;
        else {
          //*convert to plain js object
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.next_page = clonePost[limit - 1].createdAt; //*should be prev page when prev page link is clicked
        }
        //*prev page link
        if (posts[0] === undefined) cursorValues.prev_page = null;
        else {
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.prev_page = clonePost[0].createdAt; //*should be next page link when prev page link is clicked
        }
        if (posts.length == limit + 1) posts.pop();
        const result = [cursorValues, posts];
        res.send(result);
      } else if (condition === cursorValues.prev_page) {
        const posts = await Posts.findAll({
          limit: limit + 1,
          where: { createdAt: { [Op.lt]: condition } },
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: Users,
              as: 'Posted_By',
              attributes: ['email', 'avatar'],
            },
            {
              model: Comments,
              as: 'Comments',
            },
          ],
        });
        if (posts[limit] === undefined) cursorValues.prev_page = null;
        else {
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.prev_page = clonePost[limit - 1].createdAt; //*should be prev page when prev page link is clicked
        }
        if (posts[0] === undefined) cursorValues.next_page = null;
        else {
          const clonePost = JSON.parse(JSON.stringify(posts));
          cursorValues.next_page = clonePost[0].createdAt; //*should be next page link when prev page link is clicked
        }
        if (posts.length == limit + 1) posts.pop();
        const result = [cursorValues, posts];
        res.send(result);
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: `${err}` });
    }
  
    // try {
    //   const getAll = await client.search({
    //     index: 'posts',
    //   })
    //   const posts = getAll.body.hits.hits.map((s) => s._source);
    //   return res.json(posts);
    // } catch (error) {
    //   ErrorHandling(res);
    // }
  };
  
  getCursorPostsOfSingleUser = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const id = req.params.id;
      if (id) {
        if (isNaN(limit)) {
          const allPosts = await Posts.findAll({
            where: { userId: id },
            include: [
              {
                model: Users,
                as: 'Posted_By',
                attributes: ['email', 'avatar'],
              },
              {
                model: Comments,
                as: 'Comments',
              },
            ],
          });
          return res.json(allPosts);
        }
  
        const cursorValues = {};
        cursorValues.next_page = req.query.next_page || '';
        cursorValues.prev_page = req.query.prev_page || '';
  
        let condition = '';
        if (cursorValues.next_page) condition = cursorValues.next_page;
        else if (cursorValues.prev_page) condition = cursorValues.prev_page;
  
        if (!condition) {
          const posts = await Posts.findAll({
            where: { userId: id },
            limit: limit + 1,
            order: [['createdAt', 'ASC']],
            include: [
              {
                model: Users,
                as: 'Posted_By',
                attributes: ['email', 'avatar'],
              },
              {
                model: Comments,
                as: 'Comments',
              },
            ],
          });
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
          const posts = await Posts.findAll({
            where: {
              [Op.and]: [{ createdAt: { [Op.gt]: condition } }, { userId: id }],
            },
            limit: limit + 1,
            order: [['createdAt', 'ASC']],
            include: [
              {
                model: Users,
                as: 'Posted_By',
                attributes: ['email', 'avatar'],
              },
              {
                model: Comments,
                as: 'Comments',
              },
            ],
          });
          //*next page link
          if (posts[limit] === undefined) cursorValues.next_page = null;
          else {
            //*convert to plain js object
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.next_page = clonePost[limit - 1].createdAt; //*should be prev page when prev page link is clicked
          }
          //*prev page link
          if (posts[0] === undefined) cursorValues.prev_page = null;
          else {
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.prev_page = clonePost[0].createdAt; //*should be next page link when prev page link is clicked
          }
          if (posts.length == limit + 1) posts.pop();
          const result = [cursorValues, posts];
          res.send(result);
        } else if (condition === cursorValues.prev_page) {
          const posts = await Posts.findAll({
            where: {
              [Op.and]: [{ createdAt: { [Op.gt]: condition } }, { userId: id }],
            },
            limit: limit + 1,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Users,
                as: 'Posted_By',
                attributes: ['email', 'avatar'],
              },
              {
                model: Comments,
                as: 'Comments',
              },
            ],
          });
          if (posts[limit] === undefined) cursorValues.prev_page = null;
          else {
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.prev_page = clonePost[limit - 1].createdAt; //*should be prev page when prev page link is clicked
          }
          if (posts[0] === undefined) cursorValues.next_page = null;
          else {
            const clonePost = JSON.parse(JSON.stringify(posts));
            cursorValues.next_page = clonePost[0].createdAt; //*should be next page link when prev page link is clicked
          }
          if (posts.length == limit + 1) posts.pop();
          const result = [cursorValues, posts];
          res.send(result);
        }
      } else {
        return res.status(404).json('User not found');
      }
    } catch (err) {
      console.log(err);
      return res.json({ error: `${err}` });
    }
  };
  PaginatedPosts = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    try {
      const getAll = await client.count({
        index: 'posts'
      });
      const getAllP= await client.search({
        index: 'posts',
        body: {
          from: (page-1)*limit,
          size: limit,
          sort: [{ "createdAt": { "order": "desc" } }],
        }
      })
      const totalPosts = getAll.body.count;
      const totalPages = Math.ceil((totalPosts/limit));
      const posts = getAllP.body.hits.hits.map((s) => s._source);
      return res.json({Posts: posts,datalength: posts.length,totalPosts: totalPosts,totalPages: totalPages});
    } catch (error) {
      ErrorHandling(res);
    }
  }
}
