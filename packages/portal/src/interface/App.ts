import React from "react";

export interface UserInterface {
    id?: string,
    email?: string,
    password?: string,
    avatar?: string | null;
    resetLink?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SearchDataInterface {
    id: string;
    userId: string;
    title: string;
    body: string;
    image: string;
    timetoRead: number;
    createdAt: string;
    updatedAt: string;
    Posted_By: {
            id : string;
            email: string;
            password: string;
            avatar : string | null;
            resetLink: string;
            createdAt: string;
            updatedAt: string;
          }
}

export interface SearchMyDataInterface {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: {
        id: string;
    userId: string;
    title: string;
    body: string;
    image: string;
    timetoRead: number;
    createdAt: string;
    updatedAt: string;
    Posted_By: {
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
}

export interface FormDataInterface{
    id: string | Blob,
    email?: string,
    password?: string,
    avatar?: string | null;
    resetLink?: string;
    createdAt?: string;
    updatedAt?: string;
}