import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

authAxios.interceptors.response.use((res) => {
  console.log('localStorage Token::: ', localStorage.getItem('accessToken'));
  if (res.status === 401) return res;
  return res;
});

export default authAxios;
