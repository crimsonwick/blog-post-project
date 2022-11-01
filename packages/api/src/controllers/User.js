import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import model from '../models';
import { sendEmail } from '../utils/sendMail';
import { errorHandling } from '../middleware/Errors.js';

dotenv.config();

const resetSecret = process.env.RESET_PASSWORD_KEY;

const { Users } = model;
export let tokens = [];

export class UserController {
  /**
   * SignUp
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
      const checkAccount = await Users.findOne({
        where: {
          email: email,
        },
      });
      if (checkAccount) return res.json(`${email} Account Already Exists`);
      else {
        const userArray = {
          email: email,
          password: password,
        };
        const newUser = await Users.create(userArray);
        return res.json(newUser.dataValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Login
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({
        where: { email: email },
      });
      if (!user) {
        return errorHandling(res, 404);
      }
      const dbpassword = user.password;
      bcrypt.compare(password, dbpassword).then((match) => {
        if (!match) {
          return res.json({
            message: 'Wrong Credentials',
          });
        } else {
          //Authorization
          const accessToken = this.generateAccessToken({ user });
          const refreshToken = jwt.sign(
            { user },
            process.env.REFRESH_TOKEN_SECRET
          );
          tokens.push(refreshToken);
          return res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }
      });
    } catch (err) {
      errorHandling(err, 500);
    }
  };

  /**
   * Generate Access Token
   * @param {*} user
   * @returns
   */
  static generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static token = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(404);
    if (!tokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.sendStatus(403);
        const accessToken = this.generateAccessToken({
          email: user.email,
          password: user.password,
        });
        res.json({ accessToken: accessToken });
      }
    );
  };

  /**
   * Logout
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static logOut = async (req, res) => {
    tokens = tokens.filter((token) => token !== req.body.token);
    return res.sendStatus(204);
  };

  /**
   * Update User Avatar
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static updateUserAvatar = async (req, res) => {
    const userId = req.params.userId;
    let image;
    if (req.file) {
      image = req.file.originalname;
    } else {
      return res.sendStatus(404);
    }

    try {
      const user = await Users.findOne({ where: { id: userId } });
      user.avatar = image;
      await user.save();
      return res.json({ image: image });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };

  /**
   * Send Email to user
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
      // look for email in database
      const user = await Users.findOne({
        where: { email: email },
      });
      // if there is no user send back an error
      if (!user) {
        return res.status(404).json({ error: 'Invalid email' });
      }
      // otherwise we need to create a temporary token that expires in 10 mins
      const resetLink = jwt.sign({ user: user.email }, resetSecret, {
        expiresIn: '1200s',
      });
      user.resetLink = resetLink;
      await user.save();

      // we'll define this function below
      sendEmail(user, resetLink);
      return res.status(200).json({ message: 'Check your email' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  /**
   * Reset Password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static resetPassword = async (req, res) => {
    try {
      const { token } = req.query;
      // Get the token from params
      const { password, confirmPassword } = req.body;
      const resetLink = token;

      const user = await Users.findOne({
        where: {
          resetLink,
        },
      });

      // if there is no user, send back an error
      if (!user) {
        return res
          .status(400)
          .json({ message: 'We could not find a match for this link' });
      }

      jwt.verify(token, resetSecret, (error) => {
        if (error) {
          return res.status(400).json({ message: 'token is invalid' });
        }
      });
      if (password === confirmPassword) {
        user.password = password;
        user.resetLink = null;
        await user.save();
        return res.status(200).json({ message: 'Password updated' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
