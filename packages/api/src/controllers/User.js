import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { errorHandling } from '../middleware/Errors.js'
import { successHandling } from '../middleware/Success'
import model from '../models'
import { sendEmail } from '../utils/sendMail'
import { hashPassword } from '../utils/hashPassword'

dotenv.config()

const resetSecret = process.env.RESET_PASSWORD_KEY

const { Users } = model
export let tokens = []

export class UserController {
  /**
   * SignUp
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static signUp = async (req, res) => {
    const { email, password } = req.body
    const encryptedPassword = await hashPassword(password)
    try {
      const checkAccount = await Users.findOne({
        where: {
          email: email,
        },
      })
      if (checkAccount) return res.json(errorHandling(404))
      else {
        const userArray = {
          email: email,
          password: encryptedPassword,
        }

        const newUser = await Users.create(userArray)
        return res.json(newUser.dataValues)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Login
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static logIn = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await Users.findOne({
        where: { email: email },
      })
      if (!user) {
        return res.json(errorHandling(403))
      }
      const dbpassword = user.password
      bcrypt.compare(password, dbpassword).then((match) => {
        if (!match) {
          return res.json(errorHandling(401))
        } else {
          //Authorization
          const accessToken = this.generateAccessToken({ user })
          const refreshToken = jwt.sign(
            { user },
            process.env.REFRESH_TOKEN_SECRET,
          )
          tokens.push(refreshToken)
          return res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Generate Access Token
   * @param {*} user
   * @returns
   */
  static generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    })
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static token = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null || !tokens.includes(refreshToken)) {
      return res.sendStatus(403)
    } else
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) return res.json(errorHandling(404))
          const accessToken = this.generateAccessToken({
            email: user.email,
            password: user.password,
          })
          res.json({ accessToken: accessToken })
        },
      )
  }

  /**
   * Logout
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static logOut = async (req, res) => {
    tokens = tokens.filter((token) => token !== req.body.token)
    return res.sendStatus(204)
  }

  /**
   * Update User Avatar
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static updateUserAvatar = async (req, res) => {
    const userId = req.params.userId
    let image
    if (req.file) {
      image = req.file.originalname
    } else {
      return res.json(errorHandling(404))
    }

    try {
      const user = await Users.findOne({ where: { id: userId } })
      user.avatar = image
      await user.save()
      return res.json({ image: image })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Send Email to user
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static forgetPassword = async (req, res) => {
    const { email } = req.body

    try {
      // look for email in database
      const user = await Users.findOne({
        where: { email: email },
      })
      // if there is no user send back an error
      if (!user) {
        return res.json(errorHandling(403))
      }
      // otherwise we need to create a temporary token that expires in 10 mins
      const resetLink = jwt.sign({ user: user.email }, resetSecret, {
        expiresIn: '1200s',
      })
      user.resetLink = resetLink
      await user.save()

      // we'll define this function below
      sendEmail(user, resetLink)
      return res.json(successHandling(200))
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Reset Password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static resetPassword = async (req, res) => {
    const { token } = req.query
    // Get the token from params
    const encryptedPassword = await hashPassword(password)
    try {
      const { token } = req.query
      // Get the token from params
      const { password, confirmPassword } = req.body
      const resetLink = token
      const user = await Users.findOne({
        where: {
          resetLink,
        },
      })
      // if there is no user, send back an error
      if (!user) {
        return res
          .status(400)
          .json({ message: 'We could not find a match for this link' })
      }
      jwt.verify(token, resetSecret, (error) => {
        if (error) {
          return res.json(errorHandling(401))
        }
      })
      if (password === confirmPassword) {
        user.password = encryptedPassword
        user.resetLink = null
        await user.save()
        return res.json(successHandling(201))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
