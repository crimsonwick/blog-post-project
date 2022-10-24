// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { useContext } from 'react';
// import { AppContextInterface, UserInterface } from '../interface/App';
// const context: AppContextInterface<UserInterface> | null =
//   useContext(AppContext);

// const BaseURL = `http://localhost:5000`;

// export interface bodyInterface {
//   token: string;
// }

// export const setLoginToken = (accessToken: string, refreshToken: string) => {
//   localStorage.setItem('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);
// };

// export const getLoginToken = async (object: bodyInterface) => {
//   return await axios.post(`${BaseURL}/users/refresh-access`, object);
// };

// export const logoutToken = async () => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
//   context?.setAccessToken(null);
//   context?.setRefreshToken(null);
// };
