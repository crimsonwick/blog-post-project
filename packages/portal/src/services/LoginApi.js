import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const getLoginDetails = async(object) => {
    return await axios.post(`${baseURL}/user/login`,object);
}

