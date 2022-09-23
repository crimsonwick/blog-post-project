import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import model from '../models';
import { Op } from 'sequelize';
import { ErrorHandling } from '../middleware/Errors.js';

dotenv.config();
const salt = bcrypt.genSaltSync(10);

const { Users } = model;

export var tokens = [];

export const SignUp = async (req, res) => {
  const { email, password } = req.body;
  const hasedPassword = bcrypt.hashSync(password, salt);
  try {
    const checkAccount = await Users.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    if (checkAccount) return res.json(`${email} Account Already Exists`);
    else {
      const userArray = { email: email, password: hasedPassword };
      const newUser = await Users.create(userArray);
      return res.json(newUser.dataValues);
    }
  } catch (error) {
    ErrorHandling(res);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { email: email },
    });
    if (!user) res.status(400).json({ error: "User Doesn't exist" });
    const dbpassword = user.password;
    bcrypt.compare(password, dbpassword).then((match) => {
      if (!match) {
        res.status(400).json({ error: 'Wrong credentials.' });
      } else {
        //Authorization
        const accessToken = generateAccessToken({ user });
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
    ErrorHandling(res);
  }
};

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

export const token = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!tokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    res.json({ accessToken: accessToken });
  });
};

export const Logout = async (req, res) => {
  tokens = tokens.filter((token) => token !== req.body.token);
  return res.sendStatus(204);
};

export const UpdateUserAvatar = async (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Request Body is Empty!!!',
    });
  }
  const userId = req.params.userId;
  const image = req.body.image;
  try {
    const user = await Users.findOne({ where: { id: userId } });
    user.image = image;
    await user.save();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
