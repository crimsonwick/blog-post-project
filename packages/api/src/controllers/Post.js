import model from '../models';
import client from '../config/elasticsearch.js';
import { ErrorHandling } from '../middleware/Errors.js';

const {  Users,Posts,Comments } = model;

export const AddPost = async (req, res) => {
    const { userId, title, body,image,timetoRead } = req.body;
    try {
      const addNewPost = await Posts.create({
        userId: userId,
        title: title,
        body: body,
        image: image,
        timetoRead: timetoRead
      });
      const C_post = await client.index({
        index: "posts",
        body: addNewPost,
      });
      return res.json(C_post);
    } catch (error) {
      ErrorHandling(res);
    }
  }

export const getPosts = async(req,res) => {
    try {
        const getAll = await client.search({
          index: 'posts',
        })
       const posts = getAll.body.hits.hits.map((s) => s._source);
       return res.json(posts);
    } catch (error) {
        ErrorHandling(res);
    }
}

export const updatePosts = async (req, res) => {
    const { id, pid } = req.params;
  try {
    const updatePost = await Posts.update({...req.body},{where: {
      id: id
    }});
    const update = await Posts.findOne({
      where: {
        id: id
      }
    });
    const newValues = Object.assign(update,{...req.body})
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

export const deletePosts = async(req,res) => {
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

export const searchPosts = async(req,res) => {
    let query = {
        index: "posts",
        body: {
          query: {
            query_string: {
              query:  req.params.title,
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

export const myPosts = async(req,res) => {
  try {
      const LoginDetails = await Users.findAll({
        where: {
          email: req.user.user.email
        }
      })
      if(!LoginDetails) return res.json(`Un Authorized Access`)
      else{
          const myPosts = await Posts.findAll({
              where: {
                  userId: LoginDetails[0].id
              }
          });
          if(!myPosts) return res.json(`You haven't Posted Anything!!`);
          else return res.json(myPosts);
      }
  } catch (error) {
      ErrorHandling(res);
  }
}