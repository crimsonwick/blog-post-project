import axios from 'axios';
const baseURL = 'http://localhost:5000';

export const getLoginDetails = async (object) => {
  return await axios.post(`${baseURL}/users/login`, object);
};

export const getSignUpDetails = async (object) => {
  return await axios.post(`${baseURL}/users/signup`, object);
};

export const parseJwt = (token) => {
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
};

export const addPost = async (object, config) => {
  return await axios.post(`${baseURL}/posts`, object, config);
};

export const gettingPosts = async (config, userId) => {
  return await axios.get(`${baseURL}/users/${userId}/posts`, config);
};

export const allPostsComing = async () => {
  return await axios.get(`${baseURL}/posts`);
};

export const logout = async (body) => {
  return await axios.delete(`${baseURL}/users/logout`, body);
};

export const parseTime = (str) => {
  let incomingDate = new Date(str);
  let currentDate = new Date();

  let diff = diff_hours(incomingDate, currentDate);
  if (diff > 24) {
    let dayDiff = diff / 24;
    dayDiff = parseInt(dayDiff);
    if (dayDiff === 1) return `${dayDiff} day ago`;
    return `${dayDiff} days ago`;
  }
  return `${diff}h ago`;
};

function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export const parseDate = (str) => {
  const object = {
    day: str.slice(8, 10),
    month: parseInt(str.slice(5, 7)),
    year: str.slice(0, 4),
  };
  var getMonth = '';
  switch (object.month) {
    case 1:
      getMonth = 'January';
      break;
    case 2:
      getMonth = 'February';
      break;
    case 3:
      getMonth = 'March';
      break;
    case 4:
      getMonth = 'April';
      break;
    case 5:
      getMonth = 'May';
      break;
    case 6:
      getMonth = 'June';
      break;
    case 7:
      getMonth = 'July';
      break;
    case 8:
      getMonth = 'August';
      break;
    case 9:
      getMonth = 'September';
      break;
    case 10:
      getMonth = 'October';
      break;
    case 11:
      getMonth = 'November';
      break;
    case 12:
      getMonth = 'December';
      break;
    default:
      getMonth = '';
      break;
  }
  const DateInChars = `${object.day} ${getMonth} ${object.year}`;
  return DateInChars;
};

export const searchAPI = async (title) => {
  return await axios.get(`${baseURL}/posts/search?title=${title}`);
};

export const getComments = async (id) => {
  return await axios.get(`${baseURL}/posts/${id}/comments`);
};

export const getReply = async (id) => {
  return await axios.get(`${baseURL}/comments/${id}/replies`);
};

export const parseName = (str) => {
  let nameField = str.split('@');
  nameField = nameField[0];
  return nameField;
}
export const searchMyPosts = async(title,id,config) => {
  return await axios.get(`${baseURL}/users/${id}/posts/search?title=${title}`,config)
}

export const PaginationforPosts = async(page,limit) => {
  return await axios.get(`${baseURL}/paginations?page=${page}&limit=${limit}`)
}
