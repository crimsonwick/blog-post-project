import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

authAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default authAxios;
