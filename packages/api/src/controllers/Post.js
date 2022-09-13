import model from '../models';

const { Posts,Comments } = model;

export const AddPost = async(req,res) => {
    const { userId,title,body } = req.body;
    try {
        const addNewPost = await Posts.create({userId: userId,title: title,body: body});
        return res.json(addNewPost);
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = async(req,res) => {
    try {
        const getAll = await Posts.findAll({
            include: {
                model: Comments,
                as: 'Comments'
            }
        });
        res.json(getAll);
    } catch (error) {
        console.log(error);
    }
}

export const updatePosts = async(req,res) => {
    try {
        const update = {...req.body};
        const { id } = req.params; 
        const updateP = await Posts.update(update,{where: {id: id}})
        res.json(`Successfully Updated Id = ${id}`);
    } catch (error) {
        console.log(error);
    }
}

export const deletePosts = async(req,res) => {
    try {
        const { id } = req.params;
        const deleteP = await Posts.destroy({where: {id: id}})
        res.json(`Successfully Deleted Id = ${id}`);
    } catch (error) {
        console.log(error);  
    }   
}