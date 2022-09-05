import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import model from '../models';
import { Op } from 'sequelize';

dotenv.config();
const salt = bcrypt.genSaltSync(10);

const { Users } = model;

export var tokens = [];


export const SignUp = async(req,res) => {
    const { name,email , password } = req.body;
    const hasedPassword = bcrypt.hashSync(password,salt);
    try {
        const checkAccount = await Users.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });
        if(checkAccount) return res.json(`${name} Account Already Exists`);
        else{
        const userArray = {name: name,email: email,password: hasedPassword};
        const newUser = await Users.create(userArray);
        return res.json(newUser.dataValues);
        }
    } catch (error) {
        console.log(error)
    }
}


export const Login = async(req,res) => {
    const { name,email,password } = req.body;
    try{
    const checkAccount = await Users.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });
        if(!checkAccount) {
            return res.json(`${name} not registered!! Sign Up first`)
        }
        else {
        const newUser = {name: name,email: email,password: password}
        const accessToken =generateAccessToken(newUser);
        const refreshToken = jwt.sign(newUser,process.env.REFRESH_TOKEN_SECRET);
        tokens.push(refreshToken);
        return res.json({accessToken: accessToken,refreshToken: refreshToken});
        }
    } catch (error) {
        console.log(error);
    }
}

export const generateAccessToken = (user) => {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '120s' });
}

export const token = (req,res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    if(!tokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error , user) => {
        if(error) return res.sendStatus(403);
        const accessToken = generateAccessToken({name: user.name,email: user.email, password: user.password});
        res.json({accessToken: accessToken})
    })
}

export const Logout = async(req,res) => {
    tokens = tokens.filter((token) => token !== req.body.token)
    return res.sendStatus(204);
}




