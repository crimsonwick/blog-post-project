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