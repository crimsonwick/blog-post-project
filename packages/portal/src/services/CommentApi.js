import axios from 'axios';

const baseURL = 'http://localhost:5000';

  export const getCommentByPostId = async(id) => {
    return await axios.get(`${baseURL}/comments/${id}`)
  }

  export const addComment = async(object) => {
    return await axios.post(`${baseURL}/comments`,object)
  }

 export const addReply = async(object) => {
  return await axios.post(`${baseURL}/comments/addReply`,object)
 }