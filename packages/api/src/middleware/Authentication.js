import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * Authentication on the basis of json web tokens.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log('verification completed::::: ', user);
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};
