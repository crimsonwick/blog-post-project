import axios from 'axios';
import React, { createContext, useState } from 'react';
import {
  AppContextInterface,
  SearchDataInterface,
  SearchMyDataInterface,
  UserInterface,
} from '../interface/App';

export const AppContext = createContext<AppContextInterface | null>(null);
export interface bodyInterface {
  token: string;
}

export const ContextProvider = (props: { children?: React.ReactNode }) => {
  const [dp, setDp] = useState<string>('');
  const [userData, setUserData] = useState<UserInterface>({});
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchDataInterface[]>([]);
  const [searchMyData, setSearchMyData] = useState<SearchMyDataInterface[]>([]);
  const [cursorPaginationLink, setCursorPaginationLink] = useState<string>('');
  const [postImage, setPostImage] = useState<Blob | File | null>(null);

  const baseURL: string = 'http://localhost:5000';

  /**
   * set login token
   * @param accessToken 
   * @param refreshToken 
   */
  const setLoginToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  /**
   * get login token
   * @param object 
   * @returns 
   */
  const getLoginToken = async (object: bodyInterface) => {
    return await axios.post(`${baseURL}/users/refresh-access`, object);
  };

  /**
   * logout token
   */
  const logoutToken = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('login');
    setAccessToken(null);
    setRefreshToken(null);
  };
  return (
    <AppContext.Provider
      value={{
        dp,
        setDp,
        setUserData,
        userData,
        setAccessToken,
        setRefreshToken,
        accessToken,
        refreshToken,
        loggedIn,
        setLoggedIn,
        searchData,
        setSearchData,
        searchMyData,
        setSearchMyData,
        cursorPaginationLink,
        setCursorPaginationLink,
        postImage,
        setPostImage,
        getLoginToken,
        setLoginToken,
        logoutToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
