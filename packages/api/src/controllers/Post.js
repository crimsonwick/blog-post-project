import model from '../models'
import client from '../config/elasticsearch.js'
import { errorHandling } from '../middleware/Errors.js'
import { uploadToCloudinary } from '../config/cloudinary'
const { Op } = require('sequelize')

const { Users, Posts, Comments } = model

const reverseString = (str) => {
  // Check input
  if (!str || str.length < 2 || typeof str !== 'string') {
    return 'Not valid'
  }

  // Take empty array revArray
  const revArray = []
  const length = str.length - 1

  // Looping from the end
  for (let i = length; i >= 0; i--) {
    revArray.push(str[i])
  }

  // Joining the array elements
  return revArray.join('')
}

const query = async (queryLimit, queryId, queryCondition, queryAll) => {
  const limit = queryLimit
  let where = {}
  if (!queryAll) {
    const id = queryId
    const condition = queryCondition
    if (condition === '') {
      where = { userId: id }
    } else {
      where = {
        [Op.and]: [{ createdAt: { [Op.lt]: condition } }, { userId: id }],
      }
    }
  } else {
    const condition = queryCondition
    if (condition === '') {
      where = {}
    } else {
      where = { createdAt: { [Op.lt]: condition } }
    }
  }

  const posts = await Posts.findAll({
    where: where,
    limit: limit + 1,
    order: [['createdAt', 'DESC']],
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
  })
  return posts
}

export class PostController {
  /**
   * Add Post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static addPost = async (req, res) => {
    const file = req.file.path
    const { userId, title, body, timeToRead } = req.body
    //*validation checks for (required) fields -> in seperate middleware
    try {
      if (file) {
        const result = await uploadToCloudinary(file)
        let url = result.url
        url = reverseString(url)
        url = url.substring(0, url.indexOf('/'))
        url = reverseString(url)

        // const pathname = new URL(url).pathname
        const addNewPost = await Posts.create({
          //*spread object returned
          userId: userId,
          title: title,
          body: body,
          image: url,
          timeToRead: timeToRead,
        })

        return res.json(addNewPost)
      } else {
        res.json(errorHandling(404))
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Search Posts
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static searchPosts = async (req, res) => {
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
    }
    try {
      const postSearched = await client.search(query)
      const filteredPosts = postSearched.body.hits.hits.map((o) => o._source)
      return res.json(filteredPosts)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Searching in user's MyArticles Page
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static searchMyPost = async (req, res) => {
    let query = {
      index: 'posts',
      body: {
        query: {
          match: { userId: req.params.id },
        },
      },
    }
    try {
      const LoginDetails = await Users.findAll({
        where: {
          email: req.user.user.email,
        },
      })
      if (!LoginDetails) return res.json(errorHandling(401))
      else {
        const myPosts = await client.search(query)
        if (!myPosts) return res.json(`You haven't Posted Anything!!`)
        else {
          const filtered = myPosts.body.hits.hits.filter((object) =>
            object._source.title.includes(req.query.title),
          )
          return res.json(filtered)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * Gets Posts
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static getPosts = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 4
      const all = true
      const id = 0

      const cursorValues = {}
      cursorValues.next_page = req.query.next_page || ''

      let condition = ''
      if (cursorValues.next_page) condition = cursorValues.next_page

      if (!condition) {
        const posts = await query(limit, id, condition, all)
        if (posts[limit] === undefined) cursorValues.next_page = null
        else {
          const clonePost = JSON.parse(JSON.stringify(posts))
          cursorValues.next_page = clonePost[limit - 1].createdAt
        }
        if (posts.length == limit + 1) posts.pop()
        const result = [cursorValues, posts]
        res.send(result)
      } else if (condition === cursorValues.next_page) {
        const posts = await query(limit, id, condition, all)
        if (posts[limit] === undefined) cursorValues.next_page = null
        else {
          const clonePost = JSON.parse(JSON.stringify(posts))
          cursorValues.next_page = clonePost[limit - 1].createdAt
        }
        if (posts[0] === undefined) cursorValues.prev_page = null
        else {
          const clonePost = JSON.parse(JSON.stringify(posts))
          cursorValues.prev_page = clonePost[0].createdAt
        }
        if (posts.length == limit + 1) posts.pop()
        const result = [cursorValues, posts]
        res.send(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  static postDetail = async (req, res) => {
    const id = req.params.id

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
      })
      return res.status(200).json(post)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   *  Get Cursor Posts of Single User
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static getCursorPostsOfSingleUser = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 4
      const id = req.params.id
      if (id) {
        let cursorValues = {}
        cursorValues.next_page = req.query.next_page || ''

        let condition = ''
        if (cursorValues.next_page) condition = cursorValues.next_page

        if (!condition) {
          const posts = await query(limit, id, condition)
          cursorValues.prevPage = null
          if (posts[limit] === undefined) cursorValues.next_page = null
          else {
            const clonePost = JSON.parse(JSON.stringify(posts))
            cursorValues.next_page = clonePost[limit - 1].createdAt
          }
          if (posts.length == limit + 1) posts.pop()
          const result = [cursorValues, posts]
          res.send(result)
        } else if (condition === cursorValues.next_page) {
          const posts = await query(limit, id, condition)
          if (posts[limit] === undefined) cursorValues.next_page = null
          else {
            const clonePost = JSON.parse(JSON.stringify(posts))
            cursorValues.next_page = clonePost[limit - 1].createdAt
          }
          if (posts[0] === undefined) cursorValues.prevPage = null
          else {
            const clonePost = JSON.parse(JSON.stringify(posts))
            cursorValues.prevPage = clonePost[0].createdAt
          }
          if (posts.length == limit + 1) posts.pop()
          const result = [cursorValues, posts]
          res.send(result)
        }
      } else {
        return res.json(errorHandling(403))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
