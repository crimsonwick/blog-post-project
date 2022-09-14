import model from '../models';
import { ErrorHandling } from '../middleware/Errors.js';

const { Comments } = model;

export const addComment = async(req,res) => {
    const { postId, userId,title,body } = req.body;
    try {
        const addC = await Comments.create({postId: postId,userId: userId,title: title,body: body});
        res.json(addC);
    } catch (error) {
        ErrorHandling(res);
    } 
}

export const getComments = async(req,res) => {
    try {
        const getAll = await Comments.findAll();
        res.json(getAll);
    } catch (error) {
        ErrorHandling(res);
    }
}

export const updateComment = async(req,res) => {
    const update = {...req.body};
    const { id } = req.params;
    try {
        const updateC = await Comments.update(update,{where: {id: id}})
        res.json(`Successfully Updated Id = ${id}`)
    } catch (error) {
        ErrorHandling(res);
    }
}

export const deleteComment = async(req,res) => {
    const {id} = req.params;
    try {
        const deleteC = await Comments.destroy({where: {id: id}})
        res.json(`Successfully Deleted Id = ${id}`) ;       
    } catch (error) {
        ErrorHandling(res);
    }
}
export const getRepliesfromComment = async(req,res) => {
    try {
        const replies  = await Comments.findAll({
            include: {
                model: Comments,
                as: 'Replies'
            }
        })
        res.json(replies);
    } catch (error) {
        ErrorHandling(res);
    }
}

export const addReply = async(req,res) => {
    const { userId,postId,parentId,title,body } = req.body;
    try {
        const addReply = await Comments.create({userId: userId,postId: postId,parentId: parentId,title: title,body: body});
         return   res.json(addReply);
    } catch (error) {
        ErrorHandling(res);
    }
}