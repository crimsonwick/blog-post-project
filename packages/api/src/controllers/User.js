import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import model from "../models";

import { ErrorHandling } from "../middleware/Errors.js";
import sgMail from '@sendgrid/mail'

const sendGridKey = process.env.SENDGRID_KEY;
const resetSecret = process.env.RESET_PASSWORD_KEY;



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
        email
      },
    });
    if (checkAccount) return res.json(`${email}  Already Exists`);

    const userArray = { email: email, password: hasedPassword };
    const newUser = await Users.create(userArray);
    return res.json(newUser.dataValues);

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
    if (!user) {

      return ErrorHandling(res, 404)
    }
    const dbpassword = user.password;
    bcrypt.compare(password, dbpassword).then((match) => {
      if (!match) {
        return ErrorHandling(res, 401);
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
    ErrorHandling(err, 500);
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

export const ForgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // look for email in database
    const user = await Users.findOne({
      where: { email: email },
    });
    // if there is no user send back an error
    if (!user) {
      return res.status(404).json({ error: "Invalid email" });
    }
    // otherwise we need to create a temporary token that expires in 10 mins
    const resetLink = jwt.sign({ user: user.email }, resetSecret, { expiresIn: '1d' });
    user.resetLink = resetLink;
    await user.save();

    // we'll define this function below
    sendEmail(user, resetLink);
    return res.status(200).json({ message: "Check your email" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

function sendEmail(user, token) {

  sgMail.setApiKey(sendGridKey);


  const msg = {
    to: user.email,
    from: "talha.shakil@kwanso.com", // your email
    subject: "Reset password requested",
    html: `
     <a href="${process.env.clientURL}/reset-password/${token}">${token}</a>
   `

  };

  sgMail.send(msg)
  console.log("Email sent");

}

export const ResetPassword = async (req, res) => {
  try {
    // Get the token from params
    const { password } = req.body;
    const resetLink = req.params.token;

    const user = await Users.findOne({
      where: {
        resetLink
      }
    })

    // if there is no user, send back an error
    if (!user) {
      return res.status(400).json({ message: 'We could not find a match for this link' });
    }

    jwt.verify(req.params.token, resetSecret, (error) => {
      if (error) {
        return res.status(400).json({ message: "token is invalid" })
      }

    })
    const hashPassword = bcrypt.hashSync(password, 8);
    // update user credentials and remove the temporary link from database before saving
    user.password = hashPassword
    user.resetLink = null;
    await user.save();

    return res.status(200).json({ message: 'Password updated' });
  } catch (error) {

    res.status(500).json({ message: error.message });

  }
}




