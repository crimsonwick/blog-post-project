import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:5000',
});

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => Promise.reject(error)
);

export default customAxios;
