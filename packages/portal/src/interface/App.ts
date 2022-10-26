import { AxiosResponse } from "axios";
import { bodyInterface } from "../context/AppContext";
import React from 'react'
import { Control } from 'react-hook-form'


export interface AddCommentInterface<P, C> {
  width: string;
  postObject?: P;
  commentObject?: C;
  placeholder: string;
  labelAbove: string;
  Comment: boolean;
  refreshComment?: (id: string) => void;
  refreshReplies?: (commentId: string) => void;
}

export interface UserInterface {
  id?: string
  email?: string
  password?: string
  avatar?: string | null
  resetLink?: string
  createdAt?: string
  updatedAt?: string
}

export interface SearchDataInterface {
  id: string
  userId: string
  title: string
  body: string
  image: string
  timeToRead: number
  createdAt: string
  updatedAt: string
  postedBy: {
    id: string
    email: string
    password: string
    avatar: string | null
    resetLink: string
    createdAt: string
    updatedAt: string
  }
}

export interface SearchMyDataInterface {
  _index: string
  _type: string
  _id: string
  _score: number
  _source: {
    id: string
    userId: string
    title: string
    body: string
    image: string
    timeToRead: number
    createdAt: string
    updatedAt: string
    postedBy: {
      id: string
      email: string
      password: string
      avatar: string | null
      resetLink: string
      createdAt: string
      updatedAt: string
    }
  }
}

export interface AppContextInterface<U> {
    dp: string;
    setDp: React.Dispatch<React.SetStateAction<string>>;
    setUserData: React.Dispatch<React.SetStateAction<U>>;
    userData: U;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
    accessToken: string | null;
    refreshToken: string | null;
    loggedIn: boolean | null;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    searchData: SearchDataInterface[] | undefined;
    setSearchData: React.Dispatch<React.SetStateAction<SearchDataInterface[]>>;
    searchMyData: SearchMyDataInterface[] | undefined;
    setSearchMyData: React.Dispatch<React.SetStateAction<SearchMyDataInterface[]>>;
    cursorPaginationLink: string;
    setCursorPaginationLink: React.Dispatch<React.SetStateAction<string>>;
    postImage: File | null | Blob;
    setPostImage: React.Dispatch<React.SetStateAction<File | null | Blob>>;
    getLoginToken: (object: bodyInterface) => Promise<AxiosResponse<any, any>>;
    setLoginToken: (accessToken: string,refreshToken: string) => void;
    logoutToken: () => void;
}

export interface FormDataInterface {
  id: string | Blob
  email?: string
  password?: string
  avatar?: string | null
  resetLink?: string
  createdAt?: string
  updatedAt?: string
}

export interface ImageInterface {
  preview: string | React.FormEvent<HTMLInputElement>
  data: File | string
}

export interface ArticleDetailInterface {
  object?: {
    id: string
    userId: string
    title: string
    body: string
    image: string
    timeToRead: number
    createdAt: string
    updatedAt: string
    postedBy: {
      id: string
      email: string
      avatar: string | null
    }
  }
}


export interface PostInterface 
  {
    id: string
    userId: string
    title: string
    body: string
    image: string
    timeToRead: number
    createdAt: string
    updatedAt: string
    postedBy: {
      email: string
      avatar: string | null
    }
  }

export interface PostsAll {
  id: string
  userId?: string
  title?: string
  body?: string
  image?: string
  timeToRead?: number
  createdAt?: string
  updatedAt?: string
  postedBy: {
    id: string
    email: string
    password: string
    avatar: string | null
    resetLink: string
    createdAt: string
    updatedAt: string
  }
}

export interface PostsAdd {
  userId: string
  title: string
  body: string
  image: string
  timeToRead: number
}

export interface DataObject {
  email: string
}

export interface HeaderInterface {
  desc?: string
  link?: string
  heading?: string
}

export interface InputButtonInterface {
  width?: string
  name?: string
}

export interface InputFieldInterface {
  width: string
  labelAbove: string
  placeholder: string
  name: string
  control: Control<any, any>
  labelBelow?: string
}

export interface ArticleDetailComponentInterface {
  articleId: string
}

export interface PostHeaderProps {
  textSize?: string
  count?: number
  name?: string
}

export interface ProtectedInterface {
  Component?: React.ReactNode
}

export interface ProtectedLoginInterface{
  pathname: string;
}

export interface ColorInterface {
  isDragAccept: boolean
  isDragReject: boolean
  isFocused: boolean
}

export interface LandingPageInterface<T> {
  Posts: T[]
  datalength: number
  totalPosts: number
  totalPages: number
}

export interface PostInterfaceForLandingPage {
  id: string
  userId: string
  title: string
  body: string
  image: string
  timeToRead: number
  createdAt: string
  updatedAt: string
  postedBy: {
    id: string
    email: string
    password: string
    avatar: string | null
    resetLink: string
    createdAt: string
    updatedAt: string
  }
}

export interface dataInterface {
  title: string
  mins: number
  body: string
}

export interface MyFile {
  preview: string
  name: string
}
export interface DataObject{
    email: string;
  }
export interface ImageInterface{
    preview: string | React.FormEvent<HTMLInputElement>;
    data: File | string;
}

export interface PostInterface {
    object?: {
        id: string;
    userId: string;
    title: string;
    body: string;
    image: string;
    timeToRead: number;
    createdAt: string;
    updatedAt: string;
    postedBy: {
            id : string;
            email: string;
            password: string;
            avatar : string | null;
            resetLink: string;
            createdAt: string;
            updatedAt: string;
          }
    }
}

export interface PostsAll {
        id: string;
    userId?: string;
    title?: string;
    body?: string;
    image?: string;
    timeToRead?: number;
    createdAt?: string;
    updatedAt?: string;
    postedBy: {
            id : string;
            email: string;
            password: string;
            avatar : string | null;
            resetLink: string;
            createdAt: string;
            updatedAt: string;
          }
}

export interface PostsAdd {
userId: string;
title: string;
body: string;
image: string;
timeToRead: number;
}

export interface LandingPageInterface<T> {
    Posts: T[];
    datalength: number;
    totalPosts: number;
    totalPages: number;
}

export interface PostInterfaceForLandingPage{
    id: string;
userId: string;
title: string;
body: string;
image: string;
timeToRead: number;
createdAt: string;
updatedAt: string;
postedBy: {
        id : string;
        email: string;
        password: string;
        avatar : string | null;
        resetLink: string;
        createdAt: string;
        updatedAt: string;
      }
}