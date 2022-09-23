import axios from 'axios';
const baseURL = 'http://localhost:5000';

export const getLoginDetails = async(object) => {
    return await axios.post(`${baseURL}/user/login`,object);
}

export const getSignUpDetails = async(object) => {
    return await axios.post(`${baseURL}/user/signup`,object);
}

export const parseJwt = (token) =>  {
    try {
      // Get Token Header
      const base64HeaderUrl = token.split('.')[0];
      const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
      const headerData = JSON.parse(window.atob(base64Header));
  
      // Get Token payload and date's
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const dataJWT = JSON.parse(window.atob(base64));
      dataJWT.header = headerData;
  
  // TODO: add expiration at check ...
      return dataJWT;
    } catch (err) {
      return false;
    }
  }
  
  export const addPost = async(object,config) => {
    return await axios.post(`${baseURL}/post`,object,config)
  }

  export const gettingPosts = async(config) => {
    return await axios.get(`${baseURL}/post`,config)
  }

  export const allPostsComing = async() => {
    return await axios.get(`${baseURL}/pagination/allPosts`)
  }

  export const logout = async (body) => {
    return await axios.delete(`${baseURL}/user/logout`, body);
  };