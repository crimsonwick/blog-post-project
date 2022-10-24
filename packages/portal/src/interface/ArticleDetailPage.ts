import React from "react";
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
    timetoRead: number;
    createdAt: string;
    updatedAt: string;
    Posted_By: {
      id: string;
      email: string;
      password: string;
      avatar: string | null;
      resetLink: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface PostsAll {
  id: string;
  userId?: string;
  title?: string;
  body?: string;
  image?: string;
  timetoRead?: number;
  createdAt?: string;
  updatedAt?: string;
  Posted_By: {
    id: string;
    email: string;
    password: string;
    avatar: string | null;
    resetLink: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PostsAdd {
  userId: string;
  title: string;
  body: string;
  image: string;
  timetoRead: number;
}
