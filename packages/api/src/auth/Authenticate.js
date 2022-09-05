import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import model from '../models';
import { Op } from 'sequelize';

const { Users,Posts } = model;

dotenv.config();

export const getPost = async(req,res) => {
    try {
        const Post = await Posts.findAll();
        return res.json(Post)
    } catch (error) {
        console.log(error);
    }
}

export const Authentication = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.json(`User is not Authorized Access Denied!`);
        req.user = user;
        next();
    })
}

export const deletePost = async(req,res) => {
    try {
        const post = await Posts.destroy({where: {
            p_id: req.params.id
        }})
        return res.json(`Successfully Deleted Post  Id = ${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async(req,res) => {
    try {
        const allUsers = await Users.findAll();
        return res.json(allUsers);
    } catch (error) {
        console.log(error);
    }
}

export const myPosts = async(req,res) => {
    try {
        const LoginDetails = await Users.findAll({
            where:{
                email: req.user.email
            }
        });
        if(!LoginDetails) return res.json(`Un Authorized Access`)
        else{
            const myPosts = await Posts.findAll({
                where: {
                    userId: LoginDetails[0].u_id
                }
            });
            if(!myPosts) return res.json(`You haven't Posted Anything!!`);
            else return res.json(myPosts);
        }
    } catch (error) {
        console.log(error);
    }
}