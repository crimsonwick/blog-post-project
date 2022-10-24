import axios from 'axios';
const baseURL: string = 'http://localhost:5000';

interface LoginDetailInterface {
  email?: string;
  password?: string;
}

export interface ConfigInterface {
  headers?: {
    Authorization?: string;
  };
}

interface LogoutInterface {
  data?: {
    token?: string;
  };
}

export const getLoginDetails = async (object: LoginDetailInterface) => {
  return await axios.post(`${baseURL}/users/login`, object);
};

export const getSignUpDetails = async (object: LoginDetailInterface) => {
  return await axios.post(`${baseURL}/users/signup`, object);
};

export const parseJwt = (token: string) => {
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

export const addPost = async (object: FormData, config: ConfigInterface) => {
  return await axios.post(`${baseURL}/posts`, object, config);
};

export const gettingPosts = async (config: ConfigInterface, id: string) => {
  return await axios.get(`${baseURL}/users/${id}/posts`, config);
};

export const allPostsComing = async () => {
  return await axios.get(`${baseURL}/posts`);
};

export const logout = async (body: LogoutInterface) => {
  return await axios.delete(`${baseURL}/users/logout`, body);
};

export const parseTime = (str: string) => {
  let incomingDate = new Date(str);
  let currentDate = new Date();

  let diff = diff_hours(incomingDate, currentDate);
  if (diff > 24) {
    let dayDiff = diff / 24;
    dayDiff = dayDiff;
    if (dayDiff === 1) return `${dayDiff} day ago`;
    return `${dayDiff} days ago`;
  }
  return `${diff}h ago`;
};

function diff_hours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export const parseDate = (str: string) => {
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

export const searchAPI = async (title: string) => {
  return await axios.get(`${baseURL}/posts/search?title=${title}`);
};

export const getComments = async (id: string) => {
  return await axios.get(`${baseURL}/posts/${id}/comments`);
};

export const getReply = async (id: string) => {
  return await axios.get(`${baseURL}/comments/${id}/replies`);
};

export const parseName = (str: string) => {
  let nameField = str.split('@');
  return nameField[0];
};
export const searchMyPostsAPI = async (
  title: string,
  id: string,
  config: ConfigInterface
) => {
  return await axios.get(
    `${baseURL}/users/${id}/posts/search?title=${title}`,
    config
  );
};

export const PaginationforPosts = async (page: number, limit: number) => {
  return await axios.get(`${baseURL}/paginations?page=${page}&limit=${limit}`);
};
