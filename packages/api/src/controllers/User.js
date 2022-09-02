import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import model from "../models";

const { Users } = model;

//Create Users(Post user )
export const postUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const getAllUser = await Users.findAll({});
    const user = await Users.findOne({
      where: { email: email },
    });
    if (user) {
      return res.json(`${email} Account Already Exists`);
    } else {
      const newUser = await Users.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.json("User Registered.");
    }
  } catch (error) {
    console.log(error);
  }
};

//Read Users(Get users )
export const getUser = async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

//OffsetBasedPagination
export const getPaginateUser = async (req, res) => {
  try {
    const pageParse = Number.parseInt(req.query.page);
    const sizeParse = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageParse) && pageParse > 0) {
      page = pageParse;
    }
    let size = 10;
    if (!Number.isNaN(sizeParse) && sizeParse > 0 && sizeParse < 10) {
      size = sizeParse;
    }
    const users = await Users.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Users.findOne({ where: { id } });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "something went wrong" });
  }
};

//Update Users(Put user)

export const updateUser = async (req, res) => {
  try {
    const update = { ...req.body };
    const updateUser = await Users.update(update, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
};

//Delete User(Delete user)

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { id: id },
    });
    if (!user) res.status(400).json({ error: "User Doesn't exist" });
    else {
      const deleteUser = await Users.destroy({ where: { id } });
      res.json({ message: "User deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const authenticateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { email },
    });
    if (!user) res.status(400).json({ error: "User Doesn't exist" });
    const dbpassword = user.password;

    bcrypt.compare(password, dbpassword).then((match) => {
      if (!match) {
        res.status(400).json({ error: "Wrong credentials." });
      } else {
        //Authorization
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        res.json({
          accessToken: accessToken,
          message: "Logged in Successfully",
        });
      }
    });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
};

//search User on email
export const searchUser = async (req, res) => {
  try {
    const { request } = req.query;
    const user = await Users.findOne({
      where: { email: { [Op.like]: "%" + request + "%" } },
    });
    if (!user) {
      res.json({ message: " User Not found " });
    } else return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
