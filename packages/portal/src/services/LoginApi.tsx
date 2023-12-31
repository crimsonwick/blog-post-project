import authAxios from '../interceptor/authAxios';
import customAxios from '../interceptor/useAxios';

interface LoginDetailInterface {
  email?: string;
  password?: string;
}

interface LogoutInterface {
  data?: {
    token?: string;
  };
}

interface RefreshToken {
  token?: string;
}

export const getLoginDetails = async (object: LoginDetailInterface) => {
  return await customAxios.post(`/users/login`, object);
};

export const getSignUpDetails = async (object: LoginDetailInterface) => {
  return await customAxios.post(`/users/signup`, object);
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

export const addPost = async (object: FormData) => {
  return await authAxios.post(`/posts`, object);
};

export const gettingPosts = async (id: string) => {
  return await authAxios.get(`/users/${id}/posts`);
};

export const allPostsComing = async () => {
  return await customAxios.get(`/posts`);
};

export const logout = async (body: LogoutInterface) => {
  return await customAxios.delete(`/users/logout`, body);
};

export const refreshToken = async (body: RefreshToken) => {
  return await customAxios.post(`/users/refresh-access`, body);
};

export const postDetail = async (id: string) => {
  return await customAxios.get(`/posts/${id}`);
};

export const userDetail = async (id: string) => {
  return await customAxios.get(`users/${id}`);
};

export const parseTime = (str: string) => {
  let incomingDate = new Date(str);
  let currentDate = new Date();

  let diff = diff_hours(incomingDate, currentDate);
  if (diff >= 24) {
    let dayDiff = Math.trunc(diff / 24);
    if (dayDiff === 1) return `${dayDiff}d ago`;
    return `${dayDiff}d ago`;
  }
  if (diff !== 0) return `${diff}h ago`;
  let diffMins = diff_mins(incomingDate, currentDate);
  return `${diffMins}m ago`;
};

function diff_mins(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

function diff_hours(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
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
  return await customAxios.get(`/posts/search?title=${title}`);
};

export const getComments = async (
  id: string,
  commentCursor: number,
  limit: number
) => {
  return await customAxios.get(
    `/posts/${id}/comments/fetch-comments?commentCursor=${commentCursor}&limit=${limit}`
  );
};

export const getReply = async (id: string) => {
  return await customAxios.get(`/comments/${id}/replies`);
};

export const parseName = (str: string | undefined) => {
  if (typeof str === 'string') {
    let nameField = str.split('@');
    return nameField[0];
  }
};
export const searchMyPostsAPI = async (title: string, id: string) => {
  return await authAxios.get(`/users/${id}/posts/search?title=${title}`);
};
